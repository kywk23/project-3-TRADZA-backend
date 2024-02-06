class UsersController {
  constructor(user) {
    this.user = user;
  }

  async getAll(req, res) {
    try {
      const output = await this.user.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addUser(req, res) {
    try {
      const data = req.body;
      const user = await this.user.create(data);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
