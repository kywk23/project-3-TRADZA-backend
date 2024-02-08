const express = require("express");
const router = express.Router();

class ListingsRouter {
  constructor(controller, checkJwt) {
    this.listingsController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get("/", this.listingsController.getAll.bind(this.listingsController));
    router.get(
      "/user-listings",
      this.listingsController.getListingsByUser.bind(this.listingsController)
    );
    router.get("/:listingId", this.listingsController.getListingById.bind(this.listingsController));
    router.post("/", this.listingsController.insertListing.bind(this.listingsController));
    return router;
  }
}

module.exports = ListingsRouter;
