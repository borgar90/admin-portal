const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { corsOptions } = require("./cors");
const collections = require("./routes/api/collections");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});

app.post("/api/collections", collections);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
