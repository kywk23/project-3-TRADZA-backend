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
  // get request based on user email
  // Check if no first,last,mobile, push them to Edit Profile Page.
  // insert for BASED ON USER TABLE - Email, first, last name, mobile
  //getUserID table - insert address
  async insertUser(req, res) {
    const { email } = req.user;
    try {
      const newUser = await this.usersModel.findOrCreate({
        where: { email: email },
      });
      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
