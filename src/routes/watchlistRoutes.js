/** @format */

import express from "express";
const router = express.Router();
import { addToWatchlist } from "../controllers/watchlistController.js";

router.post("/",addToWatchlist);

export default router;