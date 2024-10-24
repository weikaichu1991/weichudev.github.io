import mongodb from "mongodb"
import dotenv from 'dotenv';
import app from "./server.js"
import commentsDAO from "./dao/commentsDAO.js"

dotenv.config();
// require('dotenv').config();
const MongoClient = mongodb.MongoClient;
const dbUsername = process.env.DB_username;
const dbPassword = process.env.DB_passwords;
const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@comments.hzn16.mongodb.net/?retryWrites=true&w=majority&appName=comments`;

const port = process.env.PORT || 8000;

MongoClient.connect(
    mongoURI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch( err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        // async is a function, meaning it doesnt have to wait until something to happen before it start working on something.
        await commentsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
