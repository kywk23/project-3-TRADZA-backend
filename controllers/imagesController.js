class ImagesController {
  constructor(imagesModel) {
    this.imagesModel = imagesModel;
  }

  async getImagesByUserId(req, res) {
    const { userId } = req.params;
    try {
      const images = await this.imagesModel.findAll({
        where: { userId: userId },
      });
      res.json(images);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ImagesController;
