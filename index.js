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
const { app } = require("cli");
const {
  listing,
  user,
  address,
  trade,
  listings_trades,
  category,
  listing_category,
  user_display_picture,
  trade_room,
  message,
} = db;

async function initializeApp() {
  await user_display_picture.sync({ alter: true });

  //Importing Routers

  const UsersRouter = require("./routers/usersRouter");
  const ListingsRouter = require("./routers/listingsRouter");
  const TradesRouter = require("./routers/tradesRouter");
  const ListingsTradesRouter = require("./routers/listingsTradesRouter");
  const CategoriesRouter = require("./routers/categoriesRouter");
  const ImagesRouter = require("./routers/imagesRouter");
  const MessagesRouter = require("./routers/messagesRouter");

  //Importing Controllers
  const UsersControllers = require("./controllers/usersController");
  const ListingsController = require("./controllers/listingsController");
  const TradesController = require("./controllers/tradesController");
  const ListingsTradesController = require("./controllers/listingsTradesController");
  const CategoriesController = require("./controllers/categoriesController");
  const ImagesController = require("./controllers/imagesController");
  const MessagesController = require("./controllers/messagesController");

  //Initializing Controllers
  const usersControllers = new UsersControllers(user, address);
  const listingsController = new ListingsController(listing, category);
  const tradesController = new TradesController(trade, listings_trades);
  const listingsTradesController = new ListingsTradesController(listings_trades);
  const categoriesController = new CategoriesController(category, listing, listing_category);
  const messagesController = new MessagesController(message, trade_room, trade);
  const imagesController = new ImagesController(user_display_picture);

  //Initializing Routers
  const usersRouter = new UsersRouter(usersControllers, checkJwt).routes();
  const listingsRouter = new ListingsRouter(listingsController, checkJwt).routes();
  const tradesRouter = new TradesRouter(tradesController, checkJwt).routes();
  const listingsTradesRouter = new ListingsTradesRouter(listingsTradesController).routes();
  const categoriesRouter = new CategoriesRouter(categoriesController).routes();
  const messagesRouter = new MessagesRouter(messagesController).routes();
  const imagesRouter = new ImagesRouter(imagesController, checkJwt).routes();

  // Initializing Express App
  const PORT = process.env.PORT;
  const app = express();
  app.use(cors());
  app.use(express.json());
  //enable n use routers
  app.use("/users", usersRouter);
  app.use("/listings", listingsRouter);
  app.use("/trades", tradesRouter);
  app.use("/listingsTrades", listingsTradesRouter);
  app.use("/categories", categoriesRouter);
  app.use("/messages", messagesRouter);
  app.use("/images", imagesRouter);

  //Chat
  const http = require("http").Server(app);
  const socketIO = require("socket.io")(http, {
    cors: { origin: "http://localhost:5173" },
  });

  const socketNamespace = socketIO.of("/messageRoom");

  socketNamespace.on("connection", async (socket) => {
    console.log(`${socket.id}, user just connected`);

    socket.on("message", (message) => {
      console.log("Message received", message.text);
      socketNamespace.emit("messageResponse", message);
    });

    socket.on("typing", (typing) => {
      if (typing) {
        socketNamespace.emit("isTyping", true);
      } else {
        socketNamespace.emit("isTyping", false);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user has abandoned us");
      socket.disconnect();
    });
  });

  http.listen(PORT, () => {
    console.log("Application listening to port 3000");
  });
}

initializeApp();
