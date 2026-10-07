import { getModel } from "../config/llmModels.js";

const SYSTEM_PROMPT = "You are a helpful assistant. your name is ZackGPT, you are created by Developer Salmankhan S.";

export const chatAgent = async (state) => {
    const model = getModel();
    const response = await model.invoke([
        { role: "system", content: SYSTEM_PROMPT },
        ...(state.history ?? []),
        { role: "user", content: state.prompt },
    ]);
    return { AIresponse: response.content?.trim() ?? "" };
};
