/** @format */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userId = process.env.SEED_USERID;

const movies = [
	{
		title: "Pulp Fiction",
		overview:
			"The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
		releaseYear: 1994,
		genres: ["Crime", "Drama"],
		runtime: 154,
		posterUrl: "https://example.com/pulp-fiction.jpg",
		createdBy: userId,
	},
	{
		title: "Reservoir Dogs",
		overview:
			"When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
		releaseYear: 1992,
		genres: ["Crime", "Thriller"],
		runtime: 99,
		posterUrl: "https://example.com/reservoir-dogs.jpg",
		createdBy: userId,
	},
	{
		title: "Kill Bill: Vol. 1",
		overview:
			"A former assassin awakens from a coma and wreaks vengeance on the team of assassins who betrayed her.",
		releaseYear: 2003,
		genres: ["Action", "Crime"],
		runtime: 111,
		posterUrl: "https://example.com/kill-bill-vol-1.jpg",
		createdBy: userId,
	},
	{
		title: "Kill Bill: Vol. 2",
		overview:
			"The Bride continues her quest of vengeance against her former boss and lover Bill.",
		releaseYear: 2004,
		genres: ["Action", "Drama"],
		runtime: 136,
		posterUrl: "https://example.com/kill-bill-vol-2.jpg",
		createdBy: userId,
	},
	{
		title: "Inglourious Basterds",
		overview:
			"In Nazi-occupied France, a group of Jewish soldiers plan to assassinate Nazi leaders.",
		releaseYear: 2009,
		genres: ["War", "Drama"],
		runtime: 153,
		posterUrl: "https://example.com/inglourious-basterds.jpg",
		createdBy: userId,
	},
	{
		title: "Django Unchained",
		overview:
			"With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner.",
		releaseYear: 2012,
		genres: ["Western", "Drama"],
		runtime: 165,
		posterUrl: "https://example.com/django-unchained.jpg",
		createdBy: userId,
	},
	{
		title: "The Hateful Eight",
		overview:
			"Eight strangers seek refuge from a blizzard in a remote roadhouse during the post–Civil War era.",
		releaseYear: 2015,
		genres: ["Western", "Mystery"],
		runtime: 168,
		posterUrl: "https://example.com/the-hateful-eight.jpg",
		createdBy: userId,
	},
	{
		title: "Once Upon a Time in Hollywood",
		overview:
			"A faded television actor and his stunt double strive to achieve fame in the final years of Hollywood's Golden Age.",
		releaseYear: 2019,
		genres: ["Drama", "Comedy"],
		runtime: 161,
		posterUrl: "https://example.com/once-upon-a-time-in-hollywood.jpg",
		createdBy: userId,
	},
];

const seed = async () => {
	console.log("Starting to add seeded movies into DB..");
  await prisma.movie.createMany({
		data: movies,
	});
	console.log("successfully added seeded movies into DB.");
};

seed().catch((err) => {
	console.log(err);
  process.exit(1);
}).finally(async ()=> {
  await prisma.$disconnect();
})
