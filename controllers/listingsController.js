class ListingsController {
  constructor(listingModel) {
    this.listingModel = listingModel;
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