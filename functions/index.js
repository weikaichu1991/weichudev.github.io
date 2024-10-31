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
const Comment = require("./models/Comment.js");
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

app.use(express.json());
// app.use("/api/v1/comments", comments);
// app.use("*", (req, res) => res.status(404).json({error: "not found"}));

// Get all comments
app.get('/api/comments', async (req, res) => {
  try {
    await connectDB();
    const comments = await Comment.find(req).sort({ date: -1 });
    res.status(200).send(api.list(comments));
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
// app.get("/api/comments", async (req, res) => {
//   try {
//     const comments = await Comment.find().sort({ date: -1 });
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Get single comment
app.get("/api/comments/:id", async (req, res) => {
  try {
    await connectDB();
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).send({ error: "Comment not found" });
    }
    res.status(200).send(api.list(comment));
  } catch (err) {
    console.error(err.message);
    if(err.kind ==="ObjectId"){
      return res.status(404).send({msg: "Comment not found"});
    }
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// app.get("/api/comments/:id", async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);
//     if (!comment) {
//       return res.status(404).json({ error: "Comment not found" });
//     }
//     res.status(200).json(comment);
//   } catch (err) {
//     console.error(err.message);
//     if(err.kind ==="ObjectId"){
//       return res.status(404).json({msg: "Comment not found"});
//     }
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Create a new comment
app.post("/api/comments", async (req, res) => {
  const { name, email, subject, comment_text } = req.body;
  if (!name || !subject || !comment_text) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  const newComment = new Comment({ name, email, subject, comment_text });
  try {
    await connectDB();
    const savedComment = await newComment.save();
    res.status(201).send(api.list(savedComment));
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// app.post("/api/comments", async (req, res) => {
//   const { name, email, subject, comment_text } = req.body;
//   if (!name || !subject || !comment_text) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//   const newComment = new Comment({ name, email, subject, comment_text });
//   try {
//     const savedComment = await newComment.save();
//     res.status(201).json(savedComment);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Update a comment
app.put("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, comment_text } = req.body;
  if (!name || !subject || !comment_text) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { name, email, subject, comment_text, date: new Date() },
      { new: true },
    );
    await connectDB();
    res.status(200).send(api.list(updatedComment));
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// app.put("/api/comments/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, email, subject, comment_text } = req.body;
//   if (!name || !subject || !comment_text) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//   try {
//     const updatedComment = await Comment.findByIdAndUpdate(
//       id,
//       { name, email, subject, comment_text, date: new Date() },
//       { new: true },
//     );
//     res.status(200).json(updatedComment);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Delete a comment
app.delete("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connectDB();
    await Comment.findByIdAndDelete(id);
    res.status(200).send({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// app.delete("/api/comments/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Comment.findByIdAndDelete(id);
//     res.status(200).json({ message: "Comment deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// exports.app = functions.https.onRequest(app);
exports.api = onRequest({ region: 'europe-west1' }, app);
// exports.api = functions.region('europe-west1').https.onRequest(app);
