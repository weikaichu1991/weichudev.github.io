import express from "express"
// create a controller file to control what we are going to do after the routing.
import commentsCtrl from "./comments.controller.js"

const router = express.Router()

// The folling line is just for testing how the browser responds initially.
// router.route("/").get((req, res) => res.send("Hello world"))

// --- wait until all the article is assigned to an ID later. ---
// router.route("/article/:id").get(commentsCtrl.apiGetComments)
router.route("/new").post(commentsCtrl.apiPostComment)
router.route("/:id")
        .get(commentsCtrl.apiGetComment)
        .put(commentsCtrl.apiUpdateComment)
        .delete(commentsCtrl.apiDeleteComment)

export default router
