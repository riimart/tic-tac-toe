const Match = require("../models/matchModel");
const mongoose = require("mongoose");

// get all matches
const getMatches = async (req, res) => {
  const matches = await Match.find({}).sort({ createdAt: -1 });

  res.status(200).json(matches);
};

// get single match
const getMatch = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Match not found" });
  }

  const match = await Match.findById(id);

  if (!match) {
    return res.status(400).json({ error: "Match not found." });
  }

  res.status(200).json(match);
};

// create new match
const createMatch = async (req, res) => {
  const { player_1, player_2 } = req.body;

  // create match to db
  try {
    const match = await Match.create({ player_1, player_2 });
    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete match
const deleteMatch = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Match not found" });
  }

  const match = await Match.findOneAndDelete({ _id: id });

  if (!match) {
    return res.status(400).json({ error: "Match not found." });
  }

  res.status(200).json(match);
};

// update match
const updateMatch = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Match not found" });
  }

  const match = await Match.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // This ensures the updated document is returned
  );

  if (!match) {
    return res.status(400).json({ error: "Match not found." });
  }

  res.status(200).json(match);
};

module.exports = {
  getMatches,
  getMatch,
  createMatch,
  deleteMatch,
  updateMatch,
};
