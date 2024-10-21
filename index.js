//mongoDB Clusterusername: weikaichu91
//mongoDB Clusterpsw: AXAWbd3hvnrLGKWX
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"
import dotenv from 'dotenv';


dotenv.config();
// require('dotenv').config();
const MongoClient = mongodb.MongoClient;
const dbUsername = process.env.DB_username;
const dbPassword = process.env.DB_passwords;
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.inwfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const port = 8000 

MongoClient.connect(
    uri,
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
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
