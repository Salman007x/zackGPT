import { getModel } from "../config/llmModels.js";

const ROUTER_PROMPT = `You are a routing agent in a multi-agent system. Your only job is to read the user's message and decide which single specialized agent should handle it. Do not answer the user's request yourself.

Available agents:
- "chat": general conversation, questions, explanations, casual talk, or anything not covered by the agents below.
- "code": writing, reviewing, debugging, or explaining code/programs in any language.
- "image": generating or editing an image based on a description.
- "pdf": creating, reading, summarizing, or extracting content from a PDF document.
- "ppt": creating or editing a PowerPoint/slide presentation.
- "search": questions that require up-to-date, real-time, or external information the model wouldn't know on its own (news, current events, prices, facts you're unsure about).

Rules:
- Pick exactly one agent.
- If the request could fit multiple agents, pick the one matching the primary deliverable (e.g. "write a Python script and explain it" -> "code", not "chat").
- If unsure, default to "chat".

Respond with ONLY a JSON object in this exact format, no extra text:
{"agentType": "<chat|code|image|pdf|ppt|search>"}`;

const VALID_AGENT_TYPES = ["chat", "code", "image", "pdf", "ppt", "search"];

export const routerAgent = async (agentState) => {
    const model = getModel();

    const response = await model.invoke([
        { role: "system", content: ROUTER_PROMPT },
        { role: "user", content: agentState.prompt },
    ]);

    const raw = response.content?.trim() ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);

    let agentType = "chat";
    if (jsonMatch) {
        try {
            const parsed = JSON.parse(jsonMatch[0]);
            if (VALID_AGENT_TYPES.includes(parsed.agentType)) {
                agentType = parsed.agentType;
            }
        } catch {
            pass; // If JSON parsing fails, default to "chat"
        }
    }

    return { agentType };
};

export default routerAgent;