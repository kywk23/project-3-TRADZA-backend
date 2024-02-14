const express = require("express");
const router = express.Router();

class ListingDisplayPictureRouter {
  constructor(controller, checkJwt) {
    this.listingDisplayPictureController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get(
      "/",
      this.listingDisplayPictureController.getAllListingImages.bind(
        this.listingDisplayPictureController
      )
    );

    router.get(
      "/:listingId",
      this.listingDisplayPictureController.getListingImageByListingId.bind(
        this.listingDisplayPictureController
      )
    );
    router.post(
      "/:listingId",
      this.checkJwt,
      this.listingDisplayPictureController.addListingImageByListingId.bind(
        this.listingDisplayPictureController
      )
    );
    return router;
  }
}

module.exports = ListingDisplayPictureRouter;
