class UsersController {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async getAllUsers(req, res) {
    try {
      console.log("test!");
      const users = await this.usersModel.findAll();
      res.json(users);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.usersModel.findByPk(userId);
      res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async findOrCreateUser(req, res) {
    const { email, firstName, lastName, mobileNumber } = req.body;
    console.log(`Received email:`, email);

    try {
      const [user, created] = await this.usersModel.findOrCreate({
        where: { email: email },
        defaults: {
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
        },
      });

      if (!created) {
        await this.usersModel.update(
          {
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
          },
          {
            where: { email: email },
          }
        );
      }
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
