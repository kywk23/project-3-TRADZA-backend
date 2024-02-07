class UsersController {
  constructor(usersModel, addressesModel) {
    this.usersModel = usersModel;
    this.addressesModel = addressesModel;
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

  //PROFILE EDIT CONTROLLERS
  async updateMobileNumber(req, res) {
    const { userId } = req.params;
    const { mobileNumber } = req.body;
    try {
      const editMobile = await this.usersModel.update(
        { mobileNumber: mobileNumber },
        { where: { id: userId } }
      );
      console.log(`edited mobile`, editMobile);
      const output = await this.usersModel.findByPk(userId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  //ADDRESS CONTROLLERS
  async findAddress(req, res) {
    const { userId } = req.params;
    try {
      const findArea = await this.addressesModel.findAll({ where: { userId: userId } });
      return res.json(findArea);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateArea(req, res) {
    //if userId exists, do .update
    //if false, do .create

    const { userId } = req.params;
    const { area } = req.body;

    try {
      const [address, created] = await this.addressesModel.upsert(
        { area: area, userId: userId },
        { returning: true }
      );

      return res.json({ address, created });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
