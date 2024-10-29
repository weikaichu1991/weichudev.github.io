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
// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Comment = require("./Comment.js");


dotenv.config();

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@comments.hzn16.mongodb.net/?retryWrites=true&w=majority&appName=comments`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();
// app.use("/api/v1/comments", comments);
// app.use("*", (req, res) => res.status(404).json({error: "not found"}));
// Get all comments
app.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get single comment
app.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (err) {
    console.error(err.message);
    if(err.kind ==="ObjectId"){
      return res.status(404).json({msg: "Comment not found"});
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new comment
app.post("/", async (req, res) => {
  const { name, email, subject, comment_text } = req.body;
  if (!name || !subject || !comment_text) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newComment = new Comment({ name, email, subject, comment_text });
  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a comment
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, comment_text } = req.body;
  if (!name || !subject || !comment_text) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { name, email, subject, comment_text, date: new Date() },
      { new: true },
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a comment
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// functions.https.onRequest(app);
exports.app = onRequest({ region: 'europe-west1' }, app);
