/** @format */

import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
	const { movieId, status, rating, notes, userId } = req.body;

	//verify movie exist in DB
	const movie = await prisma.movie.findUnique({
		where: { id: movieId },
	});
	if (!movie) {
		return res.status(404).json({ error: "Movie not found." });
	}

	//check if its already added
	const isAlreadyExisted = await prisma.watchListItem.findUnique({
		where: {
			userId_movieId: {
				//created by @@unique
				userId: userId,
				movieId: movieId,
			},
		},
	});
	if (isAlreadyExisted) {
		return res.status(409).json({ error: "Movie already in the watchlist" });
	}

	//adding the movie
	const watchListMovie = await prisma.watchListItem.create({
		data: {
			userId,
			movieId,
			status,
			rating,
			notes,
		},
	});

	res.status(201).json({
		status: "Success, movie added to the watchlist",
		data: {
			movie: watchListMovie,
		},
	});
};

export { addToWatchlist };
