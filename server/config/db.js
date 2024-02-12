import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://Tsogt:UZGHqXbYKSYiu7Vg@mydb.vwlgrb8.mongodb.net/?retryWrites=true&w=majority');
    console.log(
      `Conneted To Mongodb Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
