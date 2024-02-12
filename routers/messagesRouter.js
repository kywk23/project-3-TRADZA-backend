const express = require("express");
const router = express.Router();

class MessagesRouter {
  constructor(controller, checkJwt) {
    this.messagesController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get(
      "/",
      this.messagesController.getAll.bind(this.messagesController)
    );
    router.get(
      "/:tradeId",
      this.messagesController.getMessagesByTradeId.bind(this.messagesController)
    );
    router.post(
      "/",
      this.messagesController.insertMessage.bind(this.messagesController)
    );
    return router;
  }
}

module.exports = MessagesRouter;
