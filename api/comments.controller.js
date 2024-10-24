import { error } from "console"
import commentsDAO from "../dao/commentsDAO.js"
// This is the part that shows the database will be connected.

export default class commentsController {
    static async apiPostComment(req, res, next){
        try {
            const comment = req.body.comment
            const name = req.body.name
            const email = req.body.email
            const subject = req.body.subject

            const commentResponse = await commentsDAO.addComment(
                name,
                email,
                subject,
                comment
            )
            res.json({status: "success"})
        } catch (e){
            res.status(500).json({ error: e.message})
        }
    }
    static async apiGetComment(req, res, next) {
        try {
            let id = req.params.id || {}
            let comment = await commentsDAO.getComment(id)
            if (!comment) {
                res.status(404).json({ error:"Not found"})
                return
            }
            res.json(comment)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error:e})
        }
    }
    static async apiUpdateComment(req, res, next){
        try {
            // const commentId = req.params.id
            const comment = req.body.comment
            const name = req.body.name
            const email = req.body.email
            const subject = req.body.subject

            const commentResponse = await commentsDAO.updateReview(
                // commentId,
                name,
                email,
                subject,
                comment
            )
            // the following shows the types of different error.
            var {error} = commentResponse
            if (error) {
                res.status(400).json({error})
            }
            if (commentResponse.modifiedCount ===0) {
                throw new Error(
                    "unable to update comment",
                )
            }
            res.json({status: "success"})
        } catch(e) {
            res.status(500).json({error: e.message})
        }
    }

    // static async apiDeleteComment(req, res, next) {
    //     try {
    //         const commentId = req.params.id
    //         const commentResponse = await commentsDAO.deleteComment(commentId)
    //         res.json({status: "success"})
    //     } catch(e){
    //         res.status(500).json({error:e.message})
    //     }
    // }

    // --- wait until all the article is assigned to an ID later. ---
    // static async apiGetComments(req, res, next) {
    //     try {
    //         let id = req.params.id || {}
    //         let comments = await commentsDAO.getCommentsByArticleId(id)
    //         if (!comments){
    //             res.status(404).json({error:"Not Found"})
    //             return
    //         }
    //         res.json(comments)
    //     } catch (e){
    //         console.log(`api, ${e}`)
    //         res.status(500).json({error:e})
    //     }
    // }
}