const express = require('express');
const HatemailRouter = express.Router();
const { Users, Hatemail, Mailboxes } = require('../database/index');
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

HatemailRouter.get('/api/user:username', (req, res) => {
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

HatemailRouter.get('/api/mailboxes:userId', (req, res) => {
  const { userId } = req.params;
  Mailboxes.findAll({
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

HatemailRouter.get('/api/hatemail:userId', (req, res) => {
  const {userId} = req.params;
  Hatemail.findAll({
    where:
    {
      recipientId: userId
    }
  })
    .then((data) => {
      res.send(data.reverse());
    })
    .catch((err) => {
      console.log('error getting all hatemail for conversation: ', err);
    });
});

HatemailRouter.post('/api/hatemail', async (req, res) => {
  const { senderId, recipientId, mail } = req.body;
  let conversationId;
  Mailboxes.findOne({ where: {
    $or: [
      {
        userOneId: senderId,
        userTwoId: recipientId
      },
      {
        userOneId: recipientId,
        userTwoId: senderId
      }
    ]}})
    .then((data) => {
      conversationId = data.id;
    })
    .catch((err) => {
      console.error('could not find conversationId: ', err);
    });
  try {
    let hatemail;

    if (conversationId) {
      hatemail = await Hatemail.create(req.body);
    } else {
      const Mailbox = await Mailboxes.create({ userOneId: senderId, userTwoId: recipientId });
      const { id: conversationId } = Mailbox.dataValues;

      hatemail = await Hatemail.create({ senderId, recipientId, conversationId, mail });
    }

    res.status(201).json(hatemail);
  } catch (err) {
    console.error('Error creating hatemail:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = HatemailRouter;
