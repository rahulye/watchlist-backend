// const express = require("express"); // load the express library from nodu modules
import express from "express";
const app = express(); // app constains the express methods() like .post() , .get() , .listen()
const PORT = 5001; 


// MOVIE ROUTES http://localhost:5001/movies
import movieRoutes from "./routes/movieRoutes.js"; // we importing a file not a pacakge so .js
app.use("/movies", movieRoutes);




// for http://localhost:5001/hello
app.get('/hello', (req, res) => {
  res.json({message:`hello from ${PORT}`});
})


                        //START SERVER
//app.listen() takes a port number and a callback function that runs once when the server successfully starts.
app.listen( PORT , () => {
  console.log(`Server running in the ${PORT}`)
})