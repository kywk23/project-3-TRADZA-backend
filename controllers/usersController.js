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

  async getUserByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await this.usersModel.findOne({
        where: { email: email },
      });
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ error: true, msg: "User not found" });
      }
    } catch (err) {
      return res.status(500).json({ error: true, msg: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.usersModel.findByPk(userId);
      return res.json(user);
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
