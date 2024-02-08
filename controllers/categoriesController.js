class CategoriesController {
  constructor(categoryModel, listingModel) {
    this.categoryModel = categoryModel;
    this.listingModel = listingModel;
    this.getAll = this.getAll.bind(this);
    this.createListingCategories = this.createListingCategories.bind(this);
  }

  async getAll(req, res) {
    try {
      const output = await this.categoryModel.findAll();
      console.log(this.categoryModel);
      console.log(this.listingModel);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createListingCategories(req, res) {
    try {
      const { listingId, categories } = req.body;
      const listing = await this.listingModel.findByPk(listingId);
      console.log(categories);
      await listing.setCategories(categories);
      const newListing = await this.listingModel.findByPk(listingId, {
        include: [this.categoryModel],
      });
      return res.json(newListing);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = CategoriesController;
