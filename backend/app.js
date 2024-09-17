require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const matchesRoutes = require("./routes/matches");

// express app
const app = express();

// middleware
app.use(express.json());

const corsOptions = {
  origin: "https://tic-tac-toe-frontend-jlln.onrender.com",
  optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/matches", matchesRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected in db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
