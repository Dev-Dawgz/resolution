const axios = require('axios');

const getStickers = () => {
  const { STIPOP_USER_ID, STIPOP_API_KEY } = process.env;
  const stipopUrl = `https://messenger.stipop.io/v1/search?userId=${STIPOP_USER_ID}&lang="en"&countryCode="US"&limit=10`;
  return axios.get(stipopUrl, { headers: {"apikey": STIPOP_API_KEY} })
    .then((response) => {
      // console.log(response.data.body.stickerList);
      return response.data.body.stickerList;
    })
    .catch((err) => console.error(err));
};

// getStickers(); // used to test function on its own

module.exports.getStickers = getStickers;
