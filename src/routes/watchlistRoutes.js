/** @format */

import express from "express";
const router = express.Router();
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
	addToWatchlist,
	deleteWatchlist,
	updateWatchlist,
} from "../controllers/watchlistController.js";

router.use(authMiddleware);
//we get user id from this so all routes have access to, by the authorized user data

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist); //http://localhost:5001/watchlist

//{{BaseURL}}/watchlist/
router.put("/:id", updateWatchlist);

//{{BaseURL}}/watchlist/34df4529-635b-47a6-a9d9-8169b8396c73
router.delete("/:id", deleteWatchlist);

export default router;
