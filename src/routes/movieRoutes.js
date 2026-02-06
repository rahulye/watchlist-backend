
import express from 'express';

const router = express.Router();

// http://localhost:5001/movies
router.get("/" , (req,res) => {
  res.json(["message" ,"hey"]);
})

// http://localhost:5001/movies/hello
router.get("/hello" , (req,res) => {
  res.json(["message" ,"hey"]);
})


export default router; 
