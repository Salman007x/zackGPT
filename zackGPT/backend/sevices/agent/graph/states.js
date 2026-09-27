import {Annotation} from "@langchain/langgraph";

export const agentState = Annotation.Root({
    prompt: Annotation(),
    AIresponse: Annotation(),
    agentType: Annotation(),
    conversationId: Annotation(),
});

export default agentState;