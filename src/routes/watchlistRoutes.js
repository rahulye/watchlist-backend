/** @format */

import express from "express";
const router = express.Router();
import authMiddleware  from '../middleware/authMiddleware.js'
import { addToWatchlist } from "../controllers/watchlistController.js";

router.use(authMiddleware);
//we get user id from this so all routes have access to the authorized user data

router.post("/",addToWatchlist);

export default router;