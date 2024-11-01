/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const { onRequest } = require("firebase-functions/v2/https");
// const functions = require("firebase-functions/v2");
const express = require("express");
// const { https } = require('firebase-functions');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const routes = require("./comments.route.js");
const app = express();


dotenv.config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

// debugging
console.log('Environment Variables:', process.env);
console.log('DB_USERNAME:', dbUsername);
console.log('DB_PASSWORD:', dbPassword);

const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@comments.hzn16.mongodb.net/?retryWrites=true&w=majority&appName=comments`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    // process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.use(cors({origin:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', routes);

// app.use("/api/v1/comments", comments);
// app.use("*", (req, res) => res.status(404).json({error: "not found"}));


// exports.app = functions.https.onRequest(app);
exports.api = onRequest({ region: 'europe-west1' }, app);
// exports.api = functions.region('europe-west1').https.onRequest(app);
