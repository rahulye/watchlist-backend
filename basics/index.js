// to laod express module
const express = require("express");
const app = express();

//to load CORS and allow access
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
  }),
);

//conection
app.listen(3000, () => {
  console.log("rahul, your sever is running");
});

// full front-end+backend simple get
app.get("/message", (req, res) => {
  res.json({ message: "this message from backend, rahul" });
});

//route parameters
app.get("/products/:blablaID", (req, res) => {
  // products array usually this is in the database we fetch it from here
  const productArray = [
    { id: 1, name: "product1" },
    { id: 2, name: "product2" },
  ];

  const id = Number(req.params.blablaID);
  const requestedProduct = productArray.find((product) => product.id === id);
  res.json(requestedProduct);
});

//response
app.get("/", (req, res) => {
  // '/' homepage
  res.send("hey this is the response from the server");
});

//JSON
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "product1" },
    { id: 2, name: "product2" },
  ]);
});
