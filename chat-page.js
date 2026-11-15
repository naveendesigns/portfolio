/* Single conversation chat UI connected to the private portfolio API. */
(function () {
  "use strict";

  var backButton = document.querySelector(".chat-page-back");
  var closeButton = document.querySelector(".chat-page-close");
  var form = document.getElementById("chatCompose");
  var input = document.getElementById("chatQuestion");
  var sendButton = form.querySelector('button[type="submit"]');
  var reactionTrigger = form.querySelector(".chat-reaction-trigger");
  var reactionPicker = document.getElementById("chatReactionPicker");
  var emptyState = document.getElementById("chatEmptyState");
  var messageList = document.getElementById("chatMessageList");
  var conversation = [];
  var isSending = false;

  function goBack() {
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  }

  function addMessage(text, kind) {
    var bubble = document.createElement("div");
    bubble.className = "chat-message chat-message--" + kind;
    bubble.textContent = text;
    messageList.appendChild(bubble);
    messageList.scrollTop = messageList.scrollHeight;
  }

  function addRelatedLinks(links) {
    if (!Array.isArray(links) || !links.length) return;
    var container = document.createElement("nav");
    container.className = "chat-related-links";
    container.setAttribute("aria-label", "Related portfolio pages");
    links.forEach(function (link) {
      if (!link || typeof link.title !== "string" || typeof link.href !== "string") return;
      var anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.title;
      container.appendChild(anchor);
    });
    if (container.childElementCount) {
      messageList.appendChild(container);
      messageList.scrollTop = messageList.scrollHeight;
    }
  }

  async function readAssistantStream(response, bubble) {
    if (!response.ok) {
      var errorBody = await response.json().catch(function () { return {}; });
      throw new Error(errorBody.error || "I couldn't reach the assistant. Please try again.");
    }

    if (!response.headers.get("content-type")?.includes("text/event-stream")) {
      var result = await response.json();
      if (typeof result.reply !== "string") throw new Error(result.error || "The assistant couldn't reply. Please try again.");
      bubble.textContent = result.reply;
      bubble.dataset.started = "true";
      bubble.classList.remove("chat-message--pending");
      return result.reply;
    }

    var reader = response.body.getReader();
    var decoder = new TextDecoder();
    var buffer = "";
    var finished = false;\n    var relatedLinks = [];

    function readEvent(eventText) {
      for (var line of eventText.split(/\r?\n/)) {
        if (!line.startsWith("data:")) continue;
        var data = line.slice(5).trim();
        if (!data) continue;
        if (data === "[DONE]") {
          finished = true;
          return;
        }
        var chunk = JSON.parse(data);
        if (chunk.error) throw new Error(chunk.error);\n        if (Array.isArray(chunk.suggestions)) relatedLinks = chunk.suggestions;
        if (typeof chunk.delta === "string" && chunk.delta) {
          if (bubble.dataset.started !== "true") {
            bubble.textContent = "";
            bubble.dataset.started = "true";
            bubble.classList.remove("chat-message--pending");
          }
          bubble.textContent += chunk.delta;
          messageList.scrollTop = messageList.scrollHeight;
        }
      }
    }

    while (!finished) {
      var part = await reader.read();
      if (part.done) break;
      buffer += decoder.decode(part.value, { stream: true });
      var events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || "";
      events.forEach(readEvent);
    }
    if (buffer && !finished) readEvent(buffer);
    if (bubble.dataset.started !== "true") throw new Error("The assistant returned an empty reply. Please try again.");
    return bubble.textContent;
  }

  async function submitMessage(message) {
    var text = (message || "").trim();
    if (!text || isSending) return;

    emptyState.hidden = true;
    addMessage(text, "user");
    conversation.push({ role: "user", content: text });
    input.value = "";
    input.style.height = "auto";
    isSending = true;
    sendButton.disabled = true;

    var pending = document.createElement("div");
    pending.className = "chat-message chat-message--assistant chat-message--pending";
    pending.textContent = "Thinking…";
    pending.setAttribute("aria-label", "Assistant is responding");
    messageList.appendChild(pending);
    messageList.scrollTop = messageList.scrollHeight;

    try {
      var response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      var reply = await readAssistantStream(response, pending);
      conversation.push({ role: "assistant", content: reply });
    } catch (error) {
      if (pending.dataset.started === "true") {
        pending.classList.remove("chat-message--pending");
        conversation.push({ role: "assistant", content: pending.textContent });
        addMessage("The reply was interrupted. Please try again.", "assistant");
      } else {
        pending.remove();
        addMessage(error.message || "I couldn't connect just now. Please try again.", "assistant");
      }
    } finally {
      isSending = false;
      sendButton.disabled = !input.value.trim();
      input.focus();
    }
  }

  backButton.addEventListener("click", goBack);
  closeButton.addEventListener("click", goBack);
  reactionTrigger.addEventListener("click", function () {
    var isOpen = !reactionPicker.hidden;
    reactionPicker.hidden = isOpen;
    reactionTrigger.setAttribute("aria-expanded", String(!isOpen));
  });
  reactionPicker.addEventListener("click", function (event) {
    var choice = event.target.closest("[data-reaction]");
    if (!choice) return;
    var reaction = choice.getAttribute("data-reaction");
    var face = reactionTrigger.querySelector(".chat-face");
    face.className = "chat-face chat-face--" + reaction;
    reactionTrigger.dataset.reaction = reaction;
    reactionTrigger.setAttribute("aria-label", "Reaction: " + choice.getAttribute("aria-label") + ". Choose a reaction");
    reactionPicker.querySelectorAll("[data-reaction]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button === choice));
    });
    reactionPicker.hidden = true;
    reactionTrigger.setAttribute("aria-expanded", "false");
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    void submitMessage(input.value);
  });
  input.addEventListener("input", function () {
    sendButton.disabled = isSending || !input.value.trim();
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 150) + "px";
  });
  document.querySelectorAll("[data-prompt]").forEach(function (button) {
    button.addEventListener("click", function () {
      void submitMessage(button.getAttribute("data-prompt"));
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !reactionPicker.hidden) {
      reactionPicker.hidden = true;
      reactionTrigger.setAttribute("aria-expanded", "false");
      reactionTrigger.focus();
    } else if (event.key === "Escape") goBack();
  });
})();

