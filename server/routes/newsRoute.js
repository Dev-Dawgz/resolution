const express = require('express');
const { News } = require('../database/index');
const newsRouter = express.Router();
const { getNews } = require('../api/media');

//Middleware
newsRouter.use(express.json());
newsRouter.use(express.urlencoded({extended: true}));

//GET headlines from api
newsRouter.get('/api', (req, res) => {
  getNews()
    .then((newsStories) => {
      res.send(newsStories.data).status(200);
    })
    .catch((err) => {
      console.error('Could not GET newsStories', err);
      res.sendStatus(500);
    });
});


//POST news headline to news database
newsRouter.post('/', (req, res) => {
  const { title } = req.body;
  News.create({headline: title})
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Could not POST to News database', err);
      res.sendStatus(500);
    });
});


module.exports = newsRouter;
