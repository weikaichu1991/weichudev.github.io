import express from "express";
import cors from "cors";
import comments from "./api/comments.route.js";

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json())

app.use("/api/v1/comments", comments);
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default app;