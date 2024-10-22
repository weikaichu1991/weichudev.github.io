import express from "express"
import cors from "cors"
import bodyParser from "bodyParser"
import mongoose from "mongoose"
import mongodb from "mongodb"
import dotenv from 'dotenv';

const app = express()
const port = 8000

app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

dotenv.config();
// require('dotenv').config();
const MongoClient = mongodb.MongoClient;
const dbUsername = process.env.DB_username;
const dbPassword = process.env.DB_passwords;
const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@comments.hzn16.mongodb.net/?retryWrites=true&w=majority&appName=comments`;


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true} );

const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    comment: String,
    date: {type: Date, default: Date.now}
});

const Comment = mongoose.model('Comment', commentSchema);

app.post('/api/comments', async(req, res) =>{
    const { name, email, subject, comment } = req.body;
    const newComment = new Comment({ name, email, subject, comment });
    await newComment.save();
    res.status(201).send(newComment);
});

app.get('/api/comments', async(req, res) => {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(200).send(comments);
});