const express = require("express");
const router = express.Router();

class ListingsRouter {
  constructor(controller, checkJwt) {
    this.listingsController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get(
      "/",
      this.listingsController.getAll.bind(this.listingsController)
    );
    router.get(
      "/available-listings",
      this.listingsController.getAllUnsoldListings.bind(this.listingsController)
    );
    router.get(
      "/user-listings",
      this.listingsController.getListingsByUser.bind(this.listingsController)
    );
    router.get(
      "/:listingId",
      this.listingsController.getListingById.bind(this.listingsController)
    );
    router.post(
      "/",
      this.listingsController.insertListing.bind(this.listingsController)
    );
    router.put(
      "/update-listing-statuses",
      this.listingsController.changeListingsStatuses.bind(this.controller)
    );
    router.put(
      "/change-reserved-status",
      this.listingsController.changeReservedStatus.bind(this.controller)
    );
    router.put(
      "/change-reserved-statuses",
      this.listingsController.changeReservedStatuses.bind(this.controller)
    );
    return router;
  }
}

module.exports = ListingsRouter;
