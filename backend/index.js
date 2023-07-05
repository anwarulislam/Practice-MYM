const express = require("express");
const connectDB = require("./config/db");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const secretKey = "alsjkakdjkathisisasecretkey";
const NASA_API_KEY = "joS4ocJX2mpkCJHpGk0PLwBX9T0daTTQVKdpI9Mf";

connectDB();

const app = express();
app.use(cors());

// body parser middleware
app.use(express.urlencoded({ extended: false }));

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

  const token = jwt.sign(
    {
      username,
    },
    secretKey
  );

  res
    .status(201)
    .json({ message: "User created successfully", username, token });
});

// login route
app.post("/login", async (req, res) => {
  console.log(req.body);
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

app.get("/nasa-image-of-the-day", async (req, res) => {
  // authenticate user
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header required",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const payload = jwt.verify(token, secretKey);
    // fetch nasa image of the day
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
});

app.listen(3000, () =>
  console.log("Server running on port http://localhost:3000")
);
