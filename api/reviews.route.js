import express from "express"
// create a controller file to control what we are going to do after the routing.
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

// The folling line is just for testing how the browser responds initially.
// router.route("/").get((req, res) => res.send("Hello world"))

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
        .get(ReviewsCtrl.apiGetReview)
        .put(ReviewsCtrl.apiUpdateReview)
        .delete(ReviewsCtrl.apiDeleteReview)

export default router
