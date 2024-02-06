const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing DB
const db = require("./db/models/index");
const { listing, user } = db;

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());
app.use(express.json());
//routers

//Users Routes
const UsersRouter = require("./routers/usersRouter");
const UsersController = require("./controllers/usersController");
const usersController = new UsersController(user);
const usersRouter = new UsersRouter(usersController).routes();

//Listings Routes
const ListingsRouter = require("./routers/listingsRouter");
const ListingsController = require("./controllers/listingsController");
const listingsController = new ListingsController(listing);
const listingRouter = new ListingsRouter(listingsController).routes();

app.use("/users", usersRouter);
app.use("/listings", listingRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

//PLACEHOLDER TEST
