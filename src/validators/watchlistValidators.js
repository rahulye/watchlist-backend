/** @format */

// schema for the request body
import { z } from "zod";

const addToWatchlistSchema = z.object({
	movieId: z.string().uuid({
		message: "Invalid movie id format",
	}),
	status: z
		.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
			required_error: "Status is required",
			invalid_type_error:
				"Status must be one of PLANNED, WATCHING, COMPLETED, DROPPED",
		})
		.optional(),
	rating: z.coerce
		.number({ invalid_type_error: "Rating must be an number" })
		.int("Rating must be an integer")
		.min(1, "Rating must between 1 and 10")
		.max(10, "Rating must between 1 and 10")
		.optional(),
	notes: z.string().optional(),
});

export { addToWatchlistSchema };
