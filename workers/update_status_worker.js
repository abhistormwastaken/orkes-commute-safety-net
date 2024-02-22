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

  module.exports = {
    update_status_worker,
  }