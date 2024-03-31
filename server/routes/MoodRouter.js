const express = require('express');
const MoodRouter = express.Router();
const { MoodNotes } = require('../database/index');

const app = express();

app.use(express.json());

MoodRouter.post('/mood', (req, res) => {
  // console.log(req.body);
  MoodNotes.create(req.body)
    .then((newMood) => {
      res.send(newMood);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

MoodRouter.get('/mood', (req, res) => {
  MoodNotes.findAll()
    .then((moodNotes) => {
      res.send(moodNotes);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

MoodRouter.delete('/mood/:id', (req, res) => {
  const { id } = req.params;
  MoodNotes.destroy({ where: { id } })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = MoodRouter;
