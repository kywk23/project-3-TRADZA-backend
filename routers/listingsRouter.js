const express = require("express");
const router = express.Router();

class ListingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:listingId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.addListing.bind(this.controller));
    return router;
  }
}

module.exports = ListingsRouter;
