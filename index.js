const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing DB
const db = require("./db/models/index");

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());
app.use(express.json());
//routers

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

//PLACEHOLDER TEST
