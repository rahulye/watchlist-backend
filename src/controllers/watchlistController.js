/** @format */

import { prisma } from "../config/db.js";

// ADD MOVIE
const addToWatchlist = async (req, res) => {
	const { movieId, status, rating, notes } = req.body;

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
				userId: req.user.id,
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
			userId: req.user.id,
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

// DELETE MOVIE
const deleteWatchlist = async (req, res) => {
	//check movie exist in watchlist id=?id
	const movieItem = await prisma.watchListItem.findUnique({
		where: {
			id: req.params.id,
		},
	});
	if (!movieItem) {
		return res.status(404).json({ error: "Movie not found" });
	}

	//ensure only owner can delete
	if (req.user.id !== movieItem.userId) {
		return res
			.status(403)
			.json({ error: "Not right user to modify the watchlist" });
	}

	//delete it
	await prisma.watchListItem.delete({
		where: {
			id: movieItem.id,
		},
	});
	return res.status(200).json({
		status: "Success",
		message: "Movie removed from watchlist",
	});
};

// UPDATE MOVIE
const updateWatchlist = async (req, res) => {
	const { notes, rating, status } = req.body;
	const updateItem = await prisma.watchListItem.findUnique({
		where: {
			id: req.params.id,
		},
	});

	//verify movie exist or not
	if (!updateItem) {
		return res.status(404).json({ error: "Watchlist item not found" });
	}

	//ensure only owner update it
	if (updateItem.userId !== req.user.id) {
		return res.status(403).json({
			error: "Not allowed to update this watchlist item",
		});
	}

	//updation
	//build data
	const updateData = {};
	if (status !== undefined) updateData.status = status.toUpperCase();
	if (rating !== undefined) updateData.rating = rating;
	if (notes !== undefined) updateData.notes = notes;
	//update
	const updatedItem = await prisma.watchListItem.update({
		where: {
			id: req.params.id,
		},
		data: updateData
	});

	return res.status(201).json({
		status: "Success",
		data: {
			updatedItem,
		},
	});
};

export { addToWatchlist, deleteWatchlist, updateWatchlist };
