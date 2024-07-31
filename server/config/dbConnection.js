const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING).then((data) => {
      console.log(`Mongodb connected with server:${data.connection.host}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
