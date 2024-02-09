class CategoriesController {
  constructor(categoryModel, listingModel, listingsCategoriesModel) {
    this.categoryModel = categoryModel;
    this.listingModel = listingModel;
    this.listingsCategoriesModel = listingsCategoriesModel;
    this.getAll = this.getAll.bind(this);
    this.createListingCategories = this.createListingCategories.bind(this);
    this.getListingsByCategory = this.getListingsByCategory.bind(this);
  }

  async getAll(req, res) {
    try {
      const output = await this.categoryModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getListingsByCategory(req, res) {
    const { category } = req.params;
    console.log(category)
    const categoryFind = await this.categoryModel.findOne({
      where: {
        name: category
      }
    });
    const categoryId = categoryFind.id
    try {
      const listings = await this.listingsCategoriesModel.findAll({
        where: {
          categoryId: categoryId,
        }
      });
      return res.json(listings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
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
