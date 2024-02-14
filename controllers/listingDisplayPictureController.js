class ListingDisplayPictureController {
  constructor(listingDisplayPictureModel) {
    this.listingDisplayPictureModel = listingDisplayPictureModel;
  }

  async getAllListingImages(req, res) {
    const { listingId } = req.query;
    try {
      const images = await this.listingDisplayPictureModel.findAll({
        where: { listingId: listingId },
      });
      res.json(images);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getListingImageByListingId(req, res) {
    const { listingId } = req.params;
    try {
      const images = await this.listingDisplayPictureModel.findAll({
        where: { listingId: listingId },
      });
      res.json(images);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addListingImageByListingId(req, res) {
    const { url } = req.body;
    const { listingId } = req.params;
    try {
      const images = await this.listingDisplayPictureModel.create({
        listingId: listingId,
        url: url,
      });
      res.json(images);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ListingDisplayPictureController;
