// showing how does connecting to the DB really works
import { error } from "console"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

//ObjectId is an agent to search items we want in the DB, it will convert strings or integer into an Object it requires.

let comments

export default class commentsDAO {
    static async injectDB(conn){
        if(comments){
            return
        }
        try {
            comments = await conn.db("comments").collection("comments")
        } catch(e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addComment(name, email, subject, comment){
        try{
            const commentDoc = {
                name: name,
                email: email,
                subject: subject,
                comment: comment
            }

            return await comments.insertOne(commentDoc)
        } catch(e){
            console.error(`Unable to post review: ${e}`)
            return {error: e}
        }
    }

    static async getComment(commentId){
        try{
            return await reviews.findOne({_id:ObjectId(commentId)})
        } catch(e){
            console.error(`Unable to get review: ${e}`)
            return {error: e}
        }
    }

    static async updateComment(commentId, name, email, subject, comment) {
        try{
            const updateResponse = await comments.updateOne(
                {_id: ObjectId(commentId)},
                {$set: {name: name, email: email, subject: subject, comment: comment}}
            )

            return updateResponse
        } catch(e){
            console.error(`Unable to update review: ${e}`)
            return{error: e}
        }
    }

    static async deleteComment(commentId){
        try{
            const deleteResponse = await comments.deleteOne({
                _id: ObjectId(commentId),
            })
            return deleteResponse
        } catch(e) {
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }

    // wait until all the article is assigned to an ID later.
    // static async getCommentsByArticleId(articleId){
    //     try{
    //         const cursor = await comments.find({ articleId: parseInt(articleId) })
    //         return cursor.toArray()
    //     } catch(e) {
    //         console.error(`Unable to get review: ${e}`)
    //         return {error: e}
    //     }
    // }
}