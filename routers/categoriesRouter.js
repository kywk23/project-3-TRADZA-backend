const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller, checkJwt) {
    this.categoriesController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get(
      "/",
      this.categoriesController.getAll.bind(this.categoriesController)
    );
    router.post(
      "/create-listings-categories",
      this.categoriesController.createListingCategories.bind(this.controller)
    );
    return router;
  }
}

module.exports = CategoriesRouter;
