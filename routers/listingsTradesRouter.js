const express = require("express");
const router = express.Router();

class ListingsTradesRouter {
  constructor(controller, checkJwt) {
    this.listingsTradesController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get("/", this.listingsTradesController.getAll.bind(this.listingsTradesController));
    router.get(
      "/:tradeId",
      this.listingsTradesController.getListingTradeById.bind(this.listingsTradesController)
    );
    router.post(
      "/",
      this.listingsTradesController.insertListingTrade.bind(this.listingsTradesController)
    );
    return router;
  }
}

module.exports = ListingsTradesRouter;
