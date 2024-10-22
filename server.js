import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongodb from "mongodb"
import dotenv from 'dotenv';

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

dotenv.config();
// require('dotenv').config();
const MongoClient = mongodb.MongoClient;
const dbUsername = process.env.DB_username;
const dbPassword = process.env.DB_passwords;
const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@comments.hzn16.mongodb.net/?retryWrites=true&w=majority&appName=comments`;

(async () => {
    try {
        const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        const db = client.db('comments'); // Replace with your actual database name
        const collectionName = 'comments'; // Replace with your actual collection name
    
        const collections = await db.listCollections({ name: collectionName }).toArray();
    
        if (collections.length === 0) {
            // Collection does not exist, create it
            await db.createCollection(collectionName);
            console.log(`Collection ${collectionName} created`);
        } else {
            // Collection exists
            console.log(`Collection ${collectionName} already exists`);
        }

        const collection = db.collection(collectionName);

        // POST /api/comments
        app.post('/api/comments', async (req, res) => {
            const { name, email, subject, comment } = req.body;
            if (!name || !email || !subject || !comment) {
                return res.status(400).send('Missing required fields');
            }
            const newComment = { name, email, subject, comment, date: new Date() };
            const result = await collection.insertOne(newComment);
            res.status(201).send(result.ops[0]);
        });

        // GET /api/comments
        app.get('/api/comments', async (req, res) => {
            const comments = await collection.find().sort({ date: -1 }).toArray();
            res.status(200).send(comments);
        });

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });

        // Perform other database operations here
    
        // client.close(); // Don't close the client here, keep it open for the server to use
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
})();