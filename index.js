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
const { listing, user, address, trade, listings_trades, category, user_display_picture } = db;

async function initializeApp() {
  await user_display_picture.sync({ alter: true });

  //Importing Routers

  const UsersRouter = require("./routers/usersRouter");
  const ListingsRouter = require("./routers/listingsRouter");
  const TradesRouter = require("./routers/tradesRouter");
  const ListingsTradesRouter = require("./routers/listingsTradesRouter");
  const CategoriesRouter = require("./routers/categoriesRouter");
  const ImagesRouter = require("./routers/imagesRouter");

  //Importing Controllers
  const UsersControllers = require("./controllers/usersController");
  const ListingsController = require("./controllers/listingsController");
  const TradesController = require("./controllers/tradesController");
  const ListingsTradesController = require("./controllers/listingsTradesController");
  const CategoriesController = require("./controllers/categoriesController");
  const ImagesController = require("./controllers/imagesController");

  //Initializing Controllers
  const usersControllers = new UsersControllers(user, address);
  const listingsController = new ListingsController(listing, category);
  const tradesController = new TradesController(trade);
  const listingsTradesController = new ListingsTradesController(listings_trades);
  const categoriesController = new CategoriesController(category, listing);
  const imagesController = new ImagesController(user_display_picture);

  //Initializing Routers
  const usersRouter = new UsersRouter(usersControllers, checkJwt).routes();
  const listingsRouter = new ListingsRouter(listingsController, checkJwt).routes();
  const tradesRouter = new TradesRouter(tradesController, checkJwt).routes();
  const listingsTradesRouter = new ListingsTradesRouter(listingsTradesController).routes();
  const categoriesRouter = new CategoriesRouter(categoriesController).routes();
  const imagesRouter = new ImagesRouter(imagesController, checkJwt).routes();

  // Initializing Express App
  const PORT = process.env.PORT;
  const app = express();

  // Enable CORS access to this server
  app.use(cors());
  app.use(express.json());

  //enable n use routers
  app.use("/users", usersRouter);
  app.use("/listings", listingsRouter);
  app.use("/trades", tradesRouter);
  app.use("/listingsTrades", listingsTradesRouter);
  app.use("/categories", categoriesRouter);
  app.use("/images", imagesRouter);

  // start express server

  app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}!`);
  });
}

initializeApp();
