// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import connectDB from './db.js';
// import Comment from'./Comment.js';
import comments from './api/comments.route.js';
// import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/comments', comments); // Use the comments router for this route
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

// // Route to add a comment
// app.post('/api/comments', async (req, res) => {
//   const { name, email, subject, comment_text, date } = req.body;
//   try {
//     const newComment = new Comment({ name, email, subject, comment_text, date });
//     const savedComment = await newComment.save();
//     res.json(savedComment);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Route to get all comments
// app.get('/api/comments', async (req, res) => {
//   try {
//     const comments = await Comment.find();
//     res.json(comments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

export default app;