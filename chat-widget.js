/* Opens the single portfolio chat from the centered page launcher. */
(function () {
  "use strict";

  var launcher = document.createElement("button");
  launcher.className = "portfolio-chat-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open the portfolio chat");
  launcher.innerHTML = [
    '<span class="portfolio-chat-launcher-mark" aria-hidden="true">NK</span>',
    '<span class="portfolio-chat-launcher-copy">Ask anything about my work...</span>',
    '<span class="portfolio-chat-launcher-send" aria-hidden="true">',
    '  <svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    '</span>'
  ].join("");

  launcher.addEventListener("click", function () {
    window.location.href = "chat.html";
  });

  document.body.appendChild(launcher);
})();

