const express = require("express");
const router = express.Router();

class TradesRouter {
  constructor(controller, checkJwt) {
    this.tradesController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get(
      "/",
      this.tradesController.getAll.bind(this.tradesController)
    );
    router.get(
      "/:listingId",
      this.tradesController.getListingById.bind(this.tradesController)
    );
    router.post(
      "/",
      this.tradesController.insertListing.bind(this.tradesController)
    );
    return router;
  }
}

module.exports = TradesRouter;
