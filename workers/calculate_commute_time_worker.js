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

  module.exports = {
    calculate_commute_time_worker,
  }