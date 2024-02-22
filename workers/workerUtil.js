const {
    calculate_commute_time_worker,
    trigger_bot_call_worker,
    update_status_worker,
} = require("./workers");


const { clientPromise } = require("../client/apiUtil")
const { TaskManager } = require("@io-orkes/conductor-javascript");

async function createTaskRunner() {
  const client = await clientPromise;
  const taskRunner = new TaskManager(client, [calculate_commute_time_worker()], {
    logger: console,
    options: { pollInterval: 100, concurrency: 1 },
  });
  return taskRunner;
}

module.exports = {
  createTaskRunner: createTaskRunner
}