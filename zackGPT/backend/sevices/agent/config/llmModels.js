import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
});

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
});

const getModel = (modelName) => {
    switch (modelName) {
        case "gemini":
            return gemini;
        default:
            return groq;
    }
};

export { getModel };
