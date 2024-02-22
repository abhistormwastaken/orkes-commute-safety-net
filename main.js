const { createAndRegisterWorkflow } = require("./workflow/workflowCreator")
const { createTaskManager } = require("./worker/workerUtil")
const {
    executeWorkflowSync,
    executeWorkflowAsync,
} = require("./workflow/workflowUtil")
const { getWorkflowExecutionUrl } = require("./ApiUtil")

async function main() {
    const wf = await createAndRegisterWorkflow();
    const taskManager = await createTaskManager();
    taskManager.startPolling();
}


main()