/** @format */

// const express = require("express");              // load the express library from nodu modules
import express from "express";                       
import { config } from "dotenv";                     //dotenv is a Node.js module that loads environment variables from a .env file into process.env.
import { connectDB, disconnectDB, prisma } from "./config/db.js";
const app = express(); // app constains the express methods() like .post() , .get() , .listen()
const PORT = 5001;

config();
connectDB();

//by passing middlewares to handle post jsons
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

//routes
import movieRoutes from "./routes/movieRoutes.js"; // we importing a file not a pacakge so .js
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

// MOVIE ROUTES http://localhost:5001/movies
app.use("/movies", movieRoutes); // whnever the call have movies path use this route "movieRoutes" --> Middleware = function that runs before route handler

// AUTHENTICATION http://localhost:5001/auth
app.use("/auth", authRoutes);

// WATCHLIST http://localhost:5001/watchlist
app.use("/watchlist",watchlistRoutes);





































// for http://localhost:5001/hello
app.get("/hello", (req, res) => {
	res.json({ message: `hello from ${PORT}` });
});




//HANDLE ERROS so we disconnect from DB
// process is an NodeJS global object, It represents the current running Node.js program and .on() means “listen for an event” process.on(eventName, callback)
const gracefulShutDown = async (reason, err) => {
	if (err) console.error(reason, err);
	console.log("Shutting down the server, rahul...");
	server.close(async () => {
		await disconnectDB();
		console.log("DB disconnected successfully");
		process.exit(1); // .exit(code) Terminates the Node.js app, 1-->error / abnormal exit and 0-->successful / normal exit
	});
};
process.on("unhandledRejection", (err) => {
	gracefulShutDown("Unhandled Rejection", err);
});
process.on("uncaughtException", (err) => {
	gracefulShutDown("Uncaught Exception", err);
});
process.on("SIGINT", async () => {
	console.log("SIGINT received");
	await disconnectDB();
	process.exit(0);
});
process.on("SIGTERM", async () => {
	console.log("SIGTERM received");
	await disconnectDB();
	process.exit(0);
});

//START SERVER
//app.listen() takes a port number and a callback function that runs once when the server successfully starts.
const server = app.listen(PORT, () => {
	console.log(`Server running in the ${PORT}, rahul`);
});