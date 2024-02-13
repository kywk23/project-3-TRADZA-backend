const express = require("express");
const router = express.Router();

class TradesRouter {
  constructor(controller, checkJwt) {
    this.tradesController = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get("/", this.tradesController.getAll.bind(this.tradesController));
    router.get(
      "/pending/initiator",
      this.tradesController.getUserInitiatorPendingTrade.bind(
        this.tradesController
      )
    );
    router.get(
      "/pending/acceptor",
      this.tradesController.getUserAcceptorPendingTrade.bind(
        this.tradesController
      )
    );
    router.get(
      "/ongoing",
      this.tradesController.getUserOngoingTrade.bind(this.tradesController)
    );
    router.get(
      "/completed",
      this.tradesController.getUserCompletedTrade.bind(this.tradesController)
    );
    router.get(
      "/:tradeId",
      this.tradesController.getTradeById.bind(this.tradesController)
    );
    router.post(
      "/",
      this.tradesController.insertTrade.bind(this.tradesController)
    );
    router.delete(
      "/delete-trade",
      this.tradesController.deleteTrade.bind(this.tradesController)
    );
    router.put(
      "/update-agree-status",
      this.tradesController.updateAgreedStatus.bind(this.tradesController)
    );
    router.put(
      "/update-status",
      this.tradesController.updateTradeStatus.bind(this.tradesController)
    );
    return router;
  }
}

module.exports = TradesRouter;
