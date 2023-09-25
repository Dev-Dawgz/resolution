require('dotenv').config();
require('./auth/passport');
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const users = require('./routes/users');
const messageRouter = require('./routes/messagesHandling');
const wofRouter = require('./routes/wofRoutes.js');
const dmakerRouter = require('./routes/dmakerRouter'); //samson's route
const homeRouter = require('./routes/homeRouter');
const hatemailRouter = require('./routes/hatemailRouter');



const port = 4000;

const distPath = path.resolve(__dirname, '..', 'dist');

const app = express();
//generate secret key
const uuid = require('uuid');
const secretKey = uuid.v4();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
// serve the uploads folder as a static directory
app.use('/uploads', express.static('server/public/uploads'));
// users session
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/users', users);
app.use('/auth', authRoutes);
app.use('/wofRoutes', wofRouter);
app.use('/messagesHandling', messageRouter);
app.use('/', homeRouter);
app.use('/decisionmaker', dmakerRouter);
app.use('/hatemail', hatemailRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
