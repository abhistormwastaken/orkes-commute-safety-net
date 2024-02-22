const mongoose = require("mongoose");
const connectionString =
  "---Connection String---";
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(connectionString);
    console.log(
      "Database Connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
};
module.exports=connectDb