class ImagesController {
  constructor(imagesModel) {
    this.imagesModel = imagesModel;
  }

  async getImagesByUserId(req, res) {
    const { userId } = req.params;
    try {
      const images = await this.imagesModel.findAll({
        where: { userId: userId },
        // attributes: ["id", "userId", "userDpUrl", "createdAt", "updatedAt"],
      });
      res.json(images);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addImages(req, res) {
    const { userId } = req.params;
    const { userDpUrl } = req.body;
    try {
      const image = await this.imagesModel.create(
        {
          userId: userId,
          userDpUrl: userDpUrl,
        },
        { logging: console.log }
      );

      res.json(image);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message || "An error occurred" });
    }
  }
}

module.exports = ImagesController;
