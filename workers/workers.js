  const calculate_commute_time_worker = () => {
    return{
        taskDefName: "calculate_commute_time",
        execute: async ({ inputData }) => {
          const { employeeId } = inputData;
          const response = await fetch("http://localhost:3000/getCommuteTime/:employeeId")
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
  }

  const trigger_bot_call_worker = () => {
    return {
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
  }

  const update_status_worker = () => {
    return {
        taskDefName: "update_status",
        execute: async () => {
          const response = await fetch("http://localhost:3000/getCommuteTime/:employeeNumber", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
            })
          })
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
  }

  module.exports = {
    calculate_commute_time_worker: calculate_commute_time_worker,
    trigger_bot_call_worker: trigger_bot_call_worker,
    update_status_worker: update_status_worker,
  }