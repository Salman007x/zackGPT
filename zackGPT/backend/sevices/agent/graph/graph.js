import agentState from "./states.js";
import {StateGraph} from "@langchain/langgraph";
import routerAgent from "./router.js";
import { chatAgent }from "../agents/chat.agent.js";
import { codeAgent } from "../agents/code.agent.js";
import { imageAgent } from "../agents/image.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { searchAgent } from "../agents/search.agent.js";
const workflow = new StateGraph(agentState);

workflow.addNode('router', routerAgent);
workflow.addNode('chatAgent', chatAgent);
workflow.addNode('codeAgent', codeAgent);
workflow.addNode('imageAgent', imageAgent);
workflow.addNode('pdfAgent', pdfAgent);
workflow.addNode('pptAgent', pptAgent);
workflow.addNode('searchAgent', searchAgent);

workflow.addEdge('__start__', 'router');

workflow.addConditionalEdges('router', (agentState) => {
    const agentType = agentState.agentType;
    switch (agentType) {
        case 'chat':
            return 'chatAgent';
        case 'code':
            return 'codeAgent';
        case 'image':
            return 'imageAgent';
        case 'pdf':
            return 'pdfAgent';
        case 'ppt':
            return 'pptAgent';
        case 'search':
            return 'searchAgent';
        default:
            return 'chatAgent'; // Default to chatAgent if agentType is not recognized
    }
}, { chatAgent: 'chatAgent',
     codeAgent: 'codeAgent', 
     imageAgent: 'imageAgent', 
     pdfAgent: 'pdfAgent', 
     pptAgent: 'pptAgent', 
     searchAgent: 'searchAgent'
});

workflow.addEdge('searchAgent', 'chatAgent');
workflow.addEdge('chatAgent', '__end__');
workflow.addEdge('codeAgent', '__end__');
workflow.addEdge('imageAgent', '__end__');
workflow.addEdge('pdfAgent', '__end__');
workflow.addEdge('pptAgent', '__end__');

export const graph = workflow.compile();