require('dotenv').config();
require('./auth/passport');
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const users = require('./routes/users');
// passport strategy
const messageRouter = require('./routes/messagesHandling');
const wofRouter = require('./routes/wofRoutes.js');
const dmakerRouter = require('./routes/dmakerRouter'); //samson's route
const homeRouter = require('./routes/homeRouter');
const hatemailRouter = require('./routes/hatemailRouter');


const port = 4000;

const distPath = path.resolve(__dirname, '..', 'dist');

console.log(distPath);

//generate secret key
const app = express();
const uuid = require('uuid');
const secretKey = uuid.v4();

// test server setup for sockets
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
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
app.use('/hatemail', hatemailRouter);
// serve the uploads folder as a static directory
app.use('/uploads', express.static('server/public/uploads'));

// app.get('/favicon.ico', (req, res) => {
//   res.status(204).end(); // respond with a 204 No Content status code
// });

app.use('/', homeRouter);

// fill out routes
app.use('/decisionmaker', dmakerRouter);

// decision maker sockets

io.sockets.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on('join_room', (data) => {
    const clients = io.sockets.adapter.rooms.get(data);
    const numClients = clients ? clients.size : 0;

    console.log('Room ' + data + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(data);
    } else if (numClients === 1) {
      socket.join(data);
      // 2nd player has entered. Ready for game
      socket.to(data).emit('ready', 'READY');
    } else { // max two clients
      socket.emit('full', 'FULL');
    }

  });
  // tell 1st player, 2nd player has entered
  socket.on('other_ready', (data) => {
    socket.to(data.room).emit('other_ready', 'READY');
  });
  // client sends hand, server sends hand to opponent
  socket.on('hand', (data) => {
    //console.log(data);
    socket.to(data.room).emit('receive_hand', data);
  });
  // leave room when game is done
  socket.on('leave_room', (data) =>{
    socket.leave(data);
    console.log('left room');
  });

  socket.on('message', (data) => {
    socket.broadcast.emit('refresh', data);
  });

  // //test notifications
  socket.on('test_notify', (message) => {

    socket.emit('notification', 'if you are reading this, your pinata has been violated 👹', message );
    console.log('pinata assaulted 🪅 🥊 notifying user');
  });

  // Listen for the "newHatemail" event from a client
  socket.on("newHatemail", (data) => {
    console.log("Received new hatemail:", data);
  });

});



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
