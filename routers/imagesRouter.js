const express = require("express");
const router = express.Router();

class ImagesRouter {
  constructor(controller, checkJwt) {
    this.imagesController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get(
      "/displaypictures/:userId",
      this.imagesController.getImagesByUserId.bind(this.imagesController)
    );
    router.post(
      "/displaypictures/:userId",
      this.checkJwt,
      this.imagesController.addImages.bind(this.imagesController)
    );
    return router;
  }
}
module.exports = ImagesRouter;
