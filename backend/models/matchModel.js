const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchesSchema = new Schema(
  {
    player_1: {
      type: String,
      required: true,
    },
    player_2: {
      type: String,
      required: true,
    },
    player_1_wins: {
      type: Number,
      default: 0,
    },
    player_2_wins: {
      type: Number,
      default: 0,
    },
    draws: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchesSchema);
