const MODEL = "nvidia/nemotron-3.5-bolt-e4b";
const NVIDIA_CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

const portfolioContext = `
You are Naveen Kumar's portfolio assistant. Speak naturally, warmly, and concisely, like a helpful person introducing Naveen. Answer only from the information below. If something is not included, say you do not have that detail and invite the visitor to contact Naveen. Never invent employers, outcomes, team sizes, dates, project results, or personal details. You may answer in first person as Naveen, but do not claim to be Naveen or a human.

ABOUT NAVEEN
- Product Designer / Design Engineer based in Chennai, India.
- Works across B2B SaaS, AI/LLM experiences, design systems, and complex enterprise workflows.
- Enjoys making complicated products easier to use and works across product thinking, interaction design, prototyping, and implementation with engineers.
- Has 5+ years in product design, including 4+ years in UX/UI and product work. Earlier worked in video editing and post-production.
- Tools and skills listed: Figma, HTML, CSS, JavaScript, React, Claude, ChatGPT, and AI-assisted prototyping.
- Likes photography and capturing small moments while out and about. Portfolio sidequests include cars, coffee, restaurant interiors, and a small F1 model.

EXPERIENCE
- Integrate, USA: Product Designer, Jun 2024 to Sep 2026, product team in Chennai. B2B SaaS for lead management, integrations, user administration, and complex workflows, with design systems and design-engineering collaboration.
- Innerscore, Hyderabad: Senior UX/UI Designer, Mar 2024 to Jun 2024. Native LLM-based educational assistant, conversational UX, and usability testing. The portfolio reports a 40% reduction in navigation errors for the project.
- Hurrey Tech, Bengaluru: Product Designer, May 2022 to Jan 2024. Education SaaS for school administration and admissions workflows, design systems, and voice-assistant experiences.
- Blackdoor Studio, Chennai: Post-production Editor, Oct 2020 to Mar 2022. Video editing and post-production.

FEATURED WORK
- DesignOS is an independent AI-native design workspace concept connecting design systems, research, product decisions, and team knowledge. It is a concept and interactive product experience, not a shipped product.
- Design x Engineering Collaboration explores clearer handoffs between design and engineering.
- Teacher Experience Redesign is an education product redesign around teacher workflows.
- School Admissions Platform is a school administration experience for admissions.
- Scalable Typography System connects Figma variables to CSS.
- One Home for Store Employees is a personal retail operations concept for Android, bringing Receiving, Stowing, and Inventory Audit together. It is based on secondary research and an informal conversation, not an implemented More Retail product. Its prototype explores the workflow; store policies and technical assumptions still need validation.

CONTACT
- Email: naveenmm26@gmail.com
- LinkedIn: https://www.linkedin.com/in/naveenux/
- Portfolio: https://www.mrnk.in/

Keep most answers to a few sentences. Avoid generic praise, exaggerated claims, and jargon. For questions outside the portfolio, gently say this chat is focused on Naveen's work and interests.
`;

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

  try {
    const upstream = await fetch(NVIDIA_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: portfolioContext }, ...messages],
        temperature: 1,
        top_p: 0.95,
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

