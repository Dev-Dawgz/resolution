const express = require('express');
const HatemailRouter = express.Router();
const { Users, Hatemail, Mailbox } = require('../database/index');
const { Op } = require("sequelize");


// Define the endpoint for fetching recipients
HatemailRouter.get('/api/recipients', (req, res) => {
  // Query the database to fetch a list of recipients (users)
  Users.findAll()
    .then((data) => {
      // Send the list of recipients as a JSON response
      res.json(data);
    })
    .catch((err) => {
      console.log('Error fetching recipients: ', err);
      res.sendStatus(500);
    });
});

HatemailRouter.get('/user:username', (req, res) => {
  const { username } = req.params;
  Users.findOne({ where: { username }})
    // data will either be an object or null
    .then((data) => {
      if (data) {
        res.send(data.dataValues);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log('error finding user by username: ', err);
      res.sendStatus(500);
    });
});

HatemailRouter.get('/mailbox:userId', (req, res) => {
  const { userId } = req.params;
  Mailbox.findAll({
    where: {
      [Op.or]: [
        { userOneId: userId },
        { userTwoId: userId }
      ]
    }
  })
    .then((data) => {
      if (data) {
        res.send(data.reverse());
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log('error finding all conversations: ', err);
    });
});

HatemailRouter.get('/hatemail:convoId', (req, res) => {
  const {convoId} = req.params;
  Hatemail.findAll({ where: { conversationId: convoId } })
    .then((data) => {
      res.send(data.reverse());
    })
    .catch((err) => {
      console.log('error getting all hatemail for conversation: ', err);
    });
});

HatemailRouter.post('/hatemail', (req, res) => {
  const { senderId, recipientId, conversationId, mail } = req.body;
  if (conversationId) {
    Hatemail.create(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error creating hatemail: ', err);
        res.sendStatus(500);
      });
  } else {
    Mailbox.create({userOneId: senderId, userTwoId: recipientId})
      .then((data) => {
        const { id } = data.dataValues;
        return Hatemail.create({ senderId, recipientId, conversationId: id, mail: mail});
      })
      .then((data) => {
        res.status(201);
        res.send(data.dataValues);
      })
      .catch((err) => {
        console.log('error creating hatemail: ', err);
        res.sendStatus(500);
      });
  }

});

module.exports = HatemailRouter;
