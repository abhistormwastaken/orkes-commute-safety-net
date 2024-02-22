 const { orkesConductorClient, TaskManager } = require("@io-orkes/conductor-javascript");
  
  export const config = {
    keyId: "---keyId---",
    keySecret: "---keySecret---",
    serverUrl: `https://play.orkes.io/api`,
  };
  
  (async () => {
    const clientPromise = orkesConductorClient(config);
    const client = await clientPromise;
    console.log("***** SETUP DONE ************");

    const calculate_commute_time_worker = {
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
  
    const update_status_worker = {
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

    const manager = new TaskManager(client, [calculate_commute_time_worker]);
    manager.startPolling();
  })();
  
  module.exports = {
    clientPromise: clientPromise
  }

/*

schema{
    ID
    Number
    CommuteTime
    TravellingFlag (default false)
}

/getCommuteTime
/setTravellingFlag
/getEmployeeNumber
*/