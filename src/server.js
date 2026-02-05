const express = require("express"); // load the express library from nodu modules
const app = express(); // app constains the express methods() like .post() , .get() , .listen()
const PORT = 5001; 

app.listen( PORT , () => {
  console.log(`Server running in the ${PORT}`)
})

//app.listen() takes a port number and a callback function that runs once when the server successfully starts.

app.get('/hello', (req, res) => {
  res.json({message:`hello from ${PORT}`});
})