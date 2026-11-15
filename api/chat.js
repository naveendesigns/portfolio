const fs = require("fs");
const path = require("path");

const MODEL = "nvidia/nemotron-3.5-bolt-e4b";
const NVIDIA_CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;
const QA_PATH = path.join(__dirname, "../PORTFOLIO_CHAT_QA.md");
const QA_SOURCE = fs.readFileSync(QA_PATH, "utf8");

const STOP_WORDS = new Set(("a an and are as at be by can do does for from get give has have he her his how i in is it its me my of on or our she tell that the their them they this to was what when where which who why with work you your").split(" "));
const PROJECT_LINK_PATTERN = /^(?:case-study\.html\?slug=[a-z0-9-]+|index\.html(?:#[a-z0-9-]+)?|sidequests\.html)$/i;

function parseKnowledge(markdown) {
  const entries = [];
  let category = "Portfolio";
  let current = null;
  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith("## ")) {
      if (current) entries.push(current);
      current = null;
      category = line.slice(3).trim();
    } else if (line.startsWith("### ")) {
      if (current) entries.push(current);
      current = { category, question: line.slice(4).trim(), answer: "" };
    } else if (current && line.trim()) {
      current.answer += (current.answer ? " " : "") + line.trim();
    }
  }
  if (current) entries.push(current);
  return entries;
}

const KNOWLEDGE = parseKnowledge(QA_SOURCE);

function terms(text) {
  return (String(text).toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

function retrieve(query) {
  const queryTerms = terms(query);
  const querySet = new Set(queryTerms);
  const scored = KNOWLEDGE.map((entry) => {
    const questionTerms = terms(entry.question);
    const answerTerms = terms(entry.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));
    const questionSet = new Set(questionTerms);
    const answerSet = new Set(answerTerms);
    let score = 0;
    for (const term of querySet) {
      if (questionSet.has(term)) score += 4;
      if (answerSet.has(term)) score += 1;
    }

    const normalizedQuery = query.toLowerCase();
    if (/designos/.test(normalizedQuery) && /designos/i.test(entry.question + entry.answer)) score += 10;
    if (/teacher|hurrey/.test(normalizedQuery) && /teacher/i.test(entry.question + entry.answer)) score += 7;
    if (/admission|school/.test(normalizedQuery) && /admission/i.test(entry.question + entry.answer)) score += 7;
    if (/typography|font|type scale/.test(normalizedQuery) && /typography/i.test(entry.question + entry.answer)) score += 7;
    if (/retail|store employee|inventory/.test(normalizedQuery) && /one home|retail/i.test(entry.question + entry.answer)) score += 7;
    if (/work style|process|approach/.test(normalizedQuery) && /work style|approach|process/i.test(entry.question)) score += 5;
    if (/experience|worked|employment|career/.test(normalizedQuery) && /experience|career|worked|roles/i.test(entry.question)) score += 3;
    return { entry, score };
  }).filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 4).map((item) => item.entry);
}

function getSuggestions(entries) {
  const suggestions = [];
  const seen = new Set();
  for (const entry of entries) {
    const links = entry.answer.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
    for (const match of links) {
      const title = match[1].trim();
      const href = match[2].trim();
      if (!PROJECT_LINK_PATTERN.test(href) || seen.has(href)) continue;
      if (/^index\.html#(?:about|experience|work|process|contact)$/.test(href)) continue;
      seen.add(href);
      suggestions.push({ title, href });
      if (suggestions.length === 3) return suggestions;
    }
  }
  return suggestions;
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Use POST to send a chat message." });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return sendJson(res, 503, { error: "The assistant is not connected yet. Please try again later." });
  }

  const incoming = req.body && req.body.messages;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return sendJson(res, 400, { error: "Add a message before sending." });
  }

  const messages = incoming
    .filter((message) => message && ["user", "assistant"].includes(message.role) && typeof message.content === "string")
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content);

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return sendJson(res, 400, { error: "Send a valid message to continue." });
  }

  const matchedEntries = retrieve(messages[messages.length - 1].content);
  const referenceContext = matchedEntries.map((entry) =>
    "Question: " + entry.question + "\nPortfolio answer: " + entry.answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
  ).join("\n\n");
  const suggestions = getSuggestions(matchedEntries);
  const systemPrompt = `You are Naveen Kumar's portfolio assistant. Answer only from the portfolio reference below and the conversation. The reference is curated from published portfolio pages. Never invent employers, dates, results, skills, team sizes, research counts, or personal details. Distinguish concepts from shipped work and present reported outcomes as portfolio-reported. If the reference does not answer something, say the portfolio does not specify it. Reply naturally in first person when useful, without claiming to be human. Be specific and concise (usually 2–4 sentences). Do not include markdown links; related links are supplied separately by the site.

PORTFOLIO REFERENCE
${referenceContext || "No matching portfolio entry was found. Say that the portfolio does not specify the answer and offer the contact page."}`;

  try {
    const upstream = await fetch(NVIDIA_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 450,
        chat_template_kwargs: { enable_thinking: false },
        stream: true,
      }),
      signal: AbortSignal.timeout(55000),
    });

    if (!upstream.ok) {
      console.error("NVIDIA chat request failed with status", upstream.status);
      return sendJson(res, 502, { error: "I couldn't reach the assistant just now. Please try again in a moment." });
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    const decoder = new TextDecoder();
    let buffer = "";
    let providerDone = false;

    function forwardEvent(eventText) {
      for (const line of eventText.split(/\r?\n/)) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data) continue;
        if (data === "[DONE]") {
          providerDone = true;
          return;
        }
        try {
          const chunk = JSON.parse(data);
          const choice = chunk.choices && chunk.choices[0];
          const delta = choice && choice.delta && choice.delta.content;
          if (typeof delta === "string" && delta) {
            res.write(`data: ${JSON.stringify({ delta })}\n\n`);
          }
          if (choice && choice.finish_reason) {
            providerDone = true;
            return;
          }
        } catch {
          // Ignore non-JSON keepalive or metadata events from the provider.
        }
      }
    }

    for await (const part of upstream.body) {
      buffer += decoder.decode(part, { stream: true });
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || "";
      for (const eventText of events) {
        forwardEvent(eventText);
        if (providerDone) break;
      }
      if (providerDone) break;
    }
    if (buffer) forwardEvent(buffer);
    res.write(`data: ${JSON.stringify({ suggestions })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("NVIDIA chat request error:", error.name || "Error");
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: "The reply was interrupted. Please try again." })}\n\n`);
      res.end();
    } else {
      sendJson(res, 502, { error: "The assistant timed out. Please try again." });
    }
  }
};
