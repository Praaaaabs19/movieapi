const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: String,
  img: String,
  summary: String,
});

module.exports = mongoose.model("Movie", movieSchema);
