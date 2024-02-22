const trigger_bot_call_worker = {
    taskDefName: "trigger_bot_call",
    execute: async ({ employeeNumber }) => {
      const response = await fetch("http://localhost:3000/triggerBotCall/:employeeNumber")
      const commuteTime = response.json();
      return {
        outputData: commuteTime.CommuteTime,
        status: "COMPLETED",
      };
    },
    // domain: "fraud", // Optional
    pollInterval: 100, // Optional can be specified in the TaskManager
    concurrency: 1, // Optional can be specified in the TaskManager
  };

  module.exports = {
    trigger_bot_call_worker,
  }