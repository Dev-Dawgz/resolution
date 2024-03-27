const axios = require('axios');
require('dotenv').config();

console.log(process.env.STIPOP_USER_ID);

const getStickers = () => {
  const { STIPOP_USER_ID, STIPOP_API_KEY } = process.env;
  const stipopUrl = `https://messenger.stipop.io/v1/search?userId=${STIPOP_USER_ID}&lang="en"&countryCode="US"&limit=10`;
  axios.get(stipopUrl, { headers: {"apikey": "b2b4f2a4aa146ce392ea425ceee82994"} })
    .then((response) => console.log(response.data.body.stickerList))
    .catch((err) => console.error(err));
};

getStickers();

module.exports.getStickers = getStickers;
