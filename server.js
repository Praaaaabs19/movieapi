const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const Movie = require("./models/movie");

// Create (POST)
app.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read (GET all)
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read (GET one)
app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update (PUT)
app.put("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete (DELETE)
app.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
