/** @format */

import express from "express";

const router = express.Router();

// http://localhost:5001/movies
router.get("/", (req, res) => {
	res.json({
		message: "hey",
		from: "http://localhost:5001/movies",
		path: "movie routes",
	});
});

// http://localhost:5001/movies/hello
router.get("/hello", (req, res) => {
	res.json({
		message: "hey",
		from: "http://localhost:5001/movies/hello",
		path: "movie routes",
	});
});

export default router;
