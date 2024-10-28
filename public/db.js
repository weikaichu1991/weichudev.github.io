// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from "./server.js"

dotenv.config();
// require('dotenv').config();
const dbUsername = process.env.DB_username;
const dbPassword = process.env.DB_passwords;
const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@comments.hzn16.mongodb.net/?retryWrites=true&w=majority&appName=comments`;

// Connect to MongoDB

const PORT = process.env.PORT || 8000;


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


connectDB();
export default connectDB;