/** @format */

const mongoose = require('mongoose') ;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`DB CONNECTED 👍🏽`);
  } catch (error) {
    console.log(`DB CONNECTION FAILED 👎🏽`);
  }
};

module.exports = connectDB;
