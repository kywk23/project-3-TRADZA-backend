class ListingsController {
  constructor(listingModel, categoryModel, usersModel, listingDisplayPictureModel) {
    this.listingModel = listingModel;
    this.categoryModel = categoryModel;
    this.usersModel = usersModel;
    this.listingDisplayPictureModel = listingDisplayPictureModel;
    this.changeReservedStatus = this.changeReservedStatus.bind(this);
    this.changeReservedStatuses = this.changeReservedStatuses.bind(this);
    this.changeListingsStatuses = this.changeListingsStatuses.bind(this);
  }

  async getAll(req, res) {
    try {
      const output = await this.listingModel.findAll({
        include: [this.categoryModel, this.usersModel, this.listingDisplayPictureModel],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllUnsoldListings(req, res) {
    try {
      const output = await this.listingModel.findAll({
        where: {
          listingStatus: true,
        },
        include: [this.categoryModel, this.usersModel, this.listingDisplayPictureModel],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getListingById(req, res) {
    const { listingId } = req.params;
    try {
      const listing = await this.listingModel.findByPk(listingId, {
        include: [this.usersModel, this.listingDisplayPictureModel],
      });
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

  async changeListingStatus(req, res) {
    try {
      const { listingId, listingStatus } = req.body;
      const listing = await this.listingModel.update(
        {
          listingStatus: listingStatus,
        },
        {
          where: {
            id: listingId,
          },
        }
      );
      return res.json(listing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async changeListingsStatuses(req, res) {
    const listingsToUpdate = req.body;
    try {
      await Promise.all(
        listingsToUpdate.map((listingUpdate) => {
          const { listingId, listingStatus } = listingUpdate;
          return this.listingModel.update(
            { listingStatus: listingStatus },
            { where: { id: listingId } }
          );
        })
      );
      return res.json({ success: true, msg: "Listings statuses updated successfully" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async changeReservedStatus(req, res) {
    try {
      const { newListingReservedStatus, listingId } = req.body;
      const listing = await this.listingModel.update(
        {
          reserved: newListingReservedStatus,
        },
        {
          where: {
            id: listingId,
          },
        }
      );
      return res.json(listing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async changeReservedStatuses(req, res) {
    const listingsToUpdate = req.body;
    try {
      await Promise.all(
        listingsToUpdate.map((listingUpdate) => {
          const { listingId, newListingReservedStatus } = listingUpdate;
          return this.listingModel.update(
            { reserved: newListingReservedStatus },
            { where: { id: listingId } }
          );
        })
      );
      return res.json({ success: true, msg: "Listings updated successfully" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = ListingsController;
