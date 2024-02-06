class ListingsController {
  constructor(listing) {
    this.listing = listing;
  }

  async getAll(req, res) {
    try {
      const output = await this.listing.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const { listingId } = req.params;
    try {
      const listing = await this.listing.findByPk(listingId);
      return res.json(listing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addListing(req, res) {
    try {
      const data = req.body;
      const listing = await this.listing.create(data);
      return res.json(listing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ListingsController;
