const { Op } = require("sequelize");

class TradesController {
  constructor(tradeModel, listingsTradesModel, usersModel) {
    this.tradeModel = tradeModel;
    this.listingsTradesModel = listingsTradesModel;
    this.usersModel = usersModel;
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
      const trade = await this.tradeModel.findOne({
        where: {
          id: tradeId,
        },
      });
      return res.json(trade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getUserInitiatorPendingTrade(req, res) {
    const { userId, tradeStatus } = req.query;
    try {
      const trade = await this.tradeModel.findAll({
        where: {
          listingInitiator: userId,
          tradeStatus: tradeStatus,
        },
        include: [
          { model: this.usersModel, as: "Initiator" },
          { model: this.usersModel, as: "Acceptor" },
        ]
      });
      return res.json(trade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getUserAcceptorPendingTrade(req, res) {
    const { userId, tradeStatus } = req.query;
    try {
      const trade = await this.tradeModel.findAll({
        where: {
          listingAcceptor: userId,
          tradeStatus: tradeStatus,
        },
        include: [
          { model: this.usersModel, as: "Initiator" },
          { model: this.usersModel, as: "Acceptor" },
        ],
        logging: console.log,
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
          [Op.or]: [{ listingInitiator: userId }, { listingAcceptor: userId }],
          tradeStatus: tradeStatus,
        },
        include: [
          { model: this.usersModel, as: "Initiator" },
          { model: this.usersModel, as: "Acceptor" },
        ],
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
          [Op.or]: [{ listingInitiator: userId }, { listingAcceptor: userId }],
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

  async updateAgreedStatus(req, res) {
    const { tradeId, whoAgreed } = req.body;
    console.log(whoAgreed);
    let updatedAgree;
    try {
      if (whoAgreed === "initiator") {
        updatedAgree = await this.tradeModel.update(
          {
            initiatorAgreed: true,
          },
          {
            where: {
              id: tradeId,
            },
          }
        );
      } else if (whoAgreed === "acceptor") {
        updatedAgree = await this.tradeModel.update(
          {
            acceptorAgreed: true,
          },
          {
            where: {
              id: tradeId,
            },
          }
        );
      }
      return res.json(updatedAgree);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async reverseUpdateAgreedStatus(req, res) {
    const { tradeId, whoAgreed } = req.body;
    let updatedAgree;
    try {
      if (whoAgreed === "initiator") {
        updatedAgree = await this.tradeModel.update(
          {
            initiatorAgreed: false,
          },
          {
            where: {
              id: tradeId,
            },
          }
        );
      } else if (whoAgreed === "acceptor") {
        updatedAgree = await this.tradeModel.update(
          {
            acceptorAgreed: false,
          },
          {
            where: {
              id: tradeId,
            },
          }
        );
      }
      return res.json(updatedAgree);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async updateTradeStatus(req, res) {
    const { tradeId, newTradeStatus } = req.body;
    try {
      const updatedTrade = await this.tradeModel.update(
        {
          tradeStatus: newTradeStatus,
        },
        {
          where: {
            id: tradeId,
          },
        }
      );
      const trade = await this.tradeModel.findByPk(tradeId);
      return res.json(trade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async deleteTrade(req, res) {
    const { tradeId } = req.body;
    try {
      const deletedListingsResult = await this.listingsTradesModel.destroy({
        where: {
          tradeId: tradeId,
        },
      });

      const result = await this.tradeModel.destroy({
        where: {
          id: tradeId,
        },
      });

      if (result === 1) {
        return res.json({ success: true, msg: "Trade deleted successfully." });
      } else {
        return res.status(404).json({ error: true, msg: "Trade not found." });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, msg: err.message });
    }
  }
}

module.exports = TradesController;
