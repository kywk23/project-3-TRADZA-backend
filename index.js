const cors = require("cors");
const express = require("express");
require("dotenv").config();
const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER,
  tokenSigningAlg: "RS256",
});

// importing DB
const db = require("./db/models/index");
const { listing, user, trade} = db;

//Importing Routers
const UsersRouter = require("./routers/usersRouter");
const ListingsRouter = require("./routers/listingsRouter");
const TradesRouter = require("./routers/tradesRouter")

//Importing Controllers
const UsersControllers = require("./controllers/usersController");
const ListingsController = require("./controllers/listingsController");
const TradesController = require("./controllers/tradesController")

//Initializing Controllers
const usersControllers = new UsersControllers(user);
const listingsController = new ListingsController(listing);
const tradesController = new TradesController(trade)

//Initializing Routers
const usersRouter = new UsersRouter(usersControllers, checkJwt).routes();
const listingsRouter = new ListingsRouter(listingsController, checkJwt).routes();
const tradesRouter = new TradesRouter(tradesController, checkJwt).routes();

// Initializing Express App
const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());
app.use(express.json());

//enable n use routers
app.use("/users", usersRouter);
app.use("/listings", listingsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
