const axios = require('axios');
const { MEDIASTACK_API_KEY } = require('../config');

const getNews = () => {
  
  const newsUrl = 'http://api.mediastack.com/v1/news';
  return axios.get(newsUrl, {params: {access_key: MEDIASTACK_API_KEY}})
    .then((newsData) => {
      console.log('newsData ===>', newsData);
    })
    .catch((err) => {
      console.error('Failed to retrieve news from API', err);
    });
};
getNews();
module.exports.getNews = getNews;
