const express = require('express');
const passport = require('passport');
const { isUserAuthenticated } = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

const successLoginUrl = `${process.env.HOST}/Home`;
const errorLoginUrl = `${process.env.HOST}/login/error`;

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureMessage: true, failureRedirect: errorLoginUrl, successRedirect: successLoginUrl }), (req, res) => {
  // Store the user ID in the session
  req.session.userId = req.user.id;

  // successful authentication, redirect or respond with a success message
  res.send('Signed In!');
  // access the authenticated user from req.user

  console.log('USER', req.user);

  res.redirect('/Home');
});

router.get('/test', isUserAuthenticated, (req, res) => {});

module.exports = router;
