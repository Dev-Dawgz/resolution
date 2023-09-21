const axios = require('axios');
require('dotenv').config();

const getNews = () => {
  
  const newsUrl = `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}`;
  return axios.get(newsUrl)
    .then((newsData) => {
      console.log('Retrieved news from API');
      return newsData; 
    })
    .catch((err) => {
      console.error('Failed to retrieve news from API', err);
    });
};
module.exports.getNews = getNews;
