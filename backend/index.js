const express = require("express");
const connectDB = require("./config/db");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const secretKey = "alsjkakdjkathisisasecretkey";

connectDB();

const app = express();
app.use(cors());

// body parser middleware
app.use(express.urlencoded({ extended: false }))

// json middleware
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

const User = mongoose.model("User", userSchema);

// sign-up route
app.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;

  // find user in database
  const user = await User.findOne({ username });

  if (user) {
    return res.status(422).json({
      message: "Username already exists",
    });
  }

  // add user to database
  const newuser = new User({ username, password });
  await newuser.save();

  res
    .status(201)
    .json({ message: "User created successfully", user: user.toJSON() });
});

// login route
app.post("/login", async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;


  // find user in database
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }

  const token = jwt.sign(
    {
      username,
    },
    secretKey
  );

  res.json({ message: "User logged in successfully", username, token });
});

app.listen(3000, () =>
  console.log("Server running on port http://localhost:3000")
);
