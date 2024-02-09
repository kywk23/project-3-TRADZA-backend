class ListingsTradesController {
  constructor(listingsTradesModel) {
    this.listingsTradeModel = listingsTradesModel;
  }

  async getAll(req, res) {
    try {
      const output = await this.listingsTradeModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getListingTradeById(req, res) {
    const { listingTradeId: listingTradeId } = req.params;
    try {
      const listingTrade = await this.listingsTradeModel.findByPk(
        listingTradeId
      );
      return res.json(listingTrade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getListingsByTradeId(req, res) {
    const { tradeId } = req.params;
    try {
      const listingTrade = await this.listingsTradeModel.findAll({
        where: {
          tradeId: tradeId,
        },
      });
      return res.json(listingTrade);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertListingTrade(req, res) {
    try {
      const data = req.body;
      const newListingTrade = await this.listingsTradeModel.create(data);
      return res.json(newListingTrade);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ListingsTradesController;
