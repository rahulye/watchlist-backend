const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
  }),
);

app.use(express.json());
app.post("/items", (req, res) => {
  const { name, text } = req.body;
  console.log(name, text);
  res.json({
    message: `Thankyou for your message, and your message is ${name}, ${text}`,
  });
});

app.listen(3000 , ()=> {
  console.log('rahul you are running a post server')
})