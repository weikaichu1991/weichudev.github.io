/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const comments = require('../public/api/comments.route'); 

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// require('dotenv').config();
const dbUsername = process.env.DB_username;
const dbPassword = process.env.DB_passwords;
const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@comments.hzn16.mongodb.net/?retryWrites=true&w=majority&appName=comments`;


app.get('/dynamic', (req, res) => {
    res.send('This is a dynamic response!');
});

const connectDB = async () => {
    try {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    //   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
    console.error(err.message);
    process.exit(1);
    }
};
connectDB();

app.use('/api/v1/comments', comments);

exports.app = functions.https.onRequest(app);