import express from 'express';
import Comment from './Comment.js'; // Import the Comment model

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  const { name, email, subject, comment_text } = req.body;
  if (!name || !subject || !comment_text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newComment = new Comment({ name, email, subject, comment_text });
  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, comment_text } = req.body;
  if (!name || !subject || !comment_text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { name, email, subject, comment_text, date: new Date() },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;