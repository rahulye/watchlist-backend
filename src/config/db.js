/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
	log:
		process.env.NODE_ENV === "development"
			? ["query", "error", "warn"]
			: ["error"],
});

const connectDB = async () => {
	try {
		await prisma.$connect();
		console.log("DB connected via Prisma rahul");
	} catch (error) {
		console.log(`DB connection error : ${error.message}`);
		process.exit(1); // immediately stop the node server
	}
};

const disconnectDB = async () => {
	await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };
