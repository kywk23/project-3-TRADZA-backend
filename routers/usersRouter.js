const express = require("express");
const router = express.Router();

class UsersRouters {
  constructor(controller, checkJwt) {
    this.userController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get("/", this.userController.getAllUsers.bind(this.userController));
    router.get("/:userId", this.userController.getUserById.bind(this.userController));
    router.get("/email/:email", this.userController.getUserByEmail.bind(this.userController));
    router.post("/", this.checkJwt, this.userController.findOrCreateUser.bind(this.userController));
    return router;
  }
}
module.exports = UsersRouters;
