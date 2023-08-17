const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config/config");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log(`connected to ${db.connection.name}`);
  } catch (error) {}
};

module.exports = connectDb;
