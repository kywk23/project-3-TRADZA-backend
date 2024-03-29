class MessagesController {
  constructor(messageModel, traderoomModel, tradeModel) {
    this.messageModel = messageModel;
    this.traderoomModel = traderoomModel;
    this.tradeModel = tradeModel;
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
      const messages = await this.tradeModel.findOne({
        where: {
          id: tradeId,
        },
        include: [this.messageModel],
      });
      return res.json(messages);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertMessage(req, res) {
    try {
      const { senderId, content, tradeId, timestamp } = req.body;
      const newMessage = await this.messageModel.create({
        senderId: senderId,
        content: content,
        timestamp: timestamp,
      });
      const messageId = newMessage.id;
      const newtradeMessage = await this.traderoomModel.create({
        messageId: messageId,
        tradeId: tradeId,
      });
      return res.json(newtradeMessage);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteAllMessagesByTradeId(req, res) {
    try {
      const { tradeId } = req.body;
      console.log(tradeId)
      await this.traderoomModel.destroy({
        where: { tradeId: tradeId },
      });
      await this.messageModel.destroy({
        where: { tradeId: tradeId },
      });
      res
        .status(200)
        .send({
          message: "Messages and TradeRoom entries deleted successfully.",
        });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting messages." });
    }
  }
}

module.exports = MessagesController;
