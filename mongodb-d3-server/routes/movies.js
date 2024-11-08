const express = require('express');
const { Netflix, Hulu, AmazonPrime, Disney } = require('../models');
const router = express.Router();

// Route to fetch all movies from Netflix
router.get('/netflix-movies', async (req, res) => {
  try {
    const netflix_movies = await Netflix.find({ type: "Movie" });
    res.json(netflix_movies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

router.get("/prime-movies", async (req, res) =>{
try{
    const prime_movies = await AmazonPrime.find({type: "Movie"});
    res.json(prime_movies);
}catch (error){
    res.status(500).json({error: "Error fetching Data"});
}
});

router.get("/hulu-movies", async (req, res) =>{
    try{
        const hulu_movies = await Hulu.find({type: "Movie"});
        res.json(hulu_movies);
    }catch (error){
        res.status(500).json({error: "Error fetching Data"});
    }
    });

// Example of another endpoint for fetching data from other collections
router.get('/all-movies', async (req, res) => {
  try {
    const netflixMovies = await Netflix.find({ type: "Movie" });
    const huluMovies = await Hulu.find({ type: "Movie" });
    const amazonMovies = await AmazonPrime.find({ type: "Movie" });
    const disneyMovies = await Disney.find({ type: "Movie" });
    res.json({ netflixMovies, huluMovies, amazonMovies, disneyMovies });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = router;