import { getModel } from "../config/llmModels.js";
export const chatAgent = async (state) => {
    const model = getModel();
    const response = await model.invoke([
        { role: "user", content: state.prompt },
        { role: "system", content: "You are a helpful assistant." },
    ]);
    return {...state, AIresponse: response.content?.trim() ?? "" };
};
