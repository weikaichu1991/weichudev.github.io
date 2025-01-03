// models/Comment.js
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: true,
  },
  comment_text: {
    type: String,
    required: true,
  },
  article:{
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},
{ collection: 'comments-DB'});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
