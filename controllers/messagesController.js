class MessagesController {
  constructor(messageModel, traderoomModel) {
    this.messageModel = messageModel;
    this.traderoomModel = traderoomModel;
  }

  async getAll(req, res) {
    try {
      const output = await this.messageModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getMessagesByTradeId(req, res) {
    const { tradeId } = req.params;
    try {
      const messages = await this.traderoomModel.findAll({
        where: {
          tradeId: tradeId,
        },
      });
      return res.json(messages);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertMessage(req, res) {
    try {
      const data = req.body;
      const newMessage = await this.messageModel.create(data);
      const messageId = newMessage.id
      const newtradeMessage = await this.traderoomModel.create({
        messageId: messageId,
        tradeId: 47
      });
      return res.json(newtradeMessage)
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = MessagesController;
