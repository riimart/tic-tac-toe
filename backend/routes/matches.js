const express = require("express");
const {
  getMatches,
  getMatch,
  createMatch,
  deleteMatch,
  updateMatch,
} = require("../controllers/matchController");

const router = express.Router();

// GET all matches
router.get("/", getMatches);

// GET single match
router.get("/:id", getMatch);

// POST a new match
router.post("/", createMatch);

// DELETE a match
router.delete("/:id", deleteMatch);

// UPDATE a match
router.patch("/:id", updateMatch);

module.exports = router;
