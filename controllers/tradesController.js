class TradesController {
  constructor(tradeModel) {
    this.tradeModel = tradeModel;
  }

  async getAll(req, res) {
    try {
      const output = await this.tradeModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getTradeById(req, res) {
    const { tradeId } = req.params;
    try {
      const trade = await this.tradeModel.findByPk(tradeId);
      return res.json(trade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getUserPendingTrade(req, res) {
    const { userId, tradeStatus } = req.query;
    try {
      const trade = await this.tradeModel.findAll({
        where: {
          listingInitiator: userId,
          tradeStatus: tradeStatus,
        },
      });
      return res.json(trade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getUserOngoingTrade(req, res) {
    const { userId, tradeStatus } = req.query;
    try {
      const trade = await this.tradeModel.findAll({
        where: {
          listingInitiator: userId,
          tradeStatus: tradeStatus,
        },
      });
      return res.json(trade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getUserCompletedTrade(req, res) {
    const { userId, tradeStatus } = req.query;
    try {
      const trade = await this.tradeModel.findAll({
        where: {
          listingInitiator: userId,
          tradeStatus: tradeStatus,
        },
      });
      return res.json(trade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async insertTrade(req, res) {
    try {
      const data = req.body;
      const newTrade = await this.tradeModel.create(data);
      return res.json(newTrade);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = TradesController;
