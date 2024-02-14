class ListingsController {
  constructor(listingModel, categoryModel, listingsCategoriesModel) {
    this.listingModel = listingModel;
    this.categoryModel = categoryModel;
  }

  async getAll(req, res) {
    try {
      const output = await this.listingModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getListingById(req, res) {
    const { listingId } = req.params;
    try {
      const listing = await this.listingModel.findByPk(listingId);
      return res.json(listing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getListingsByUser(req, res) {
    const { userId, listingStatus } = req.query;
    try {
      const listings = await this.listingModel.findAll({
        where: {
          userId: userId,
          listingStatus: listingStatus,
        },
        include: [this.categoryModel],
      });
      return res.json(listings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async insertListing(req, res) {
    try {
      const data = req.body;
      const newListing = await this.listingModel.create(data);
      return res.json(newListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ListingsController;
