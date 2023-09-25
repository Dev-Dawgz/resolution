const mysql = require('mysql2/promise');

const { Users, Conversations, Messages, Void, Hatemail, Mailboxes, db } = require('./index.js');

db.options.logging = false;

const seedSqlize = () => {
  mysql.createConnection({ user: 'root', password: '', })
    .then((db) => db.query('CREATE DATABASE IF NOT EXISTS `resolution`').then(() => db.end()))
    .then(() => console.log('\x1b[33m', '\nDatabase (MySQL): \'resolution\' successfully created!'))
    .then(() => Users.sync({ force: true }))
    .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'Users\' table successfully created!'))
    .then(() => Conversations.sync({ force: true }))
    .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'Conversations\' table successfully created!'))
    .then(() => Messages.sync({ force: true }))
    .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'Messages\' table successfully created!'))
    .then(() => Void.sync({ force: true }))
    .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'Void\' table successfully created!'))
    .then(() => Mailboxes.sync({ force: true }))
    .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'Mailboxes\' table successfully created!'))
    .then(() => Hatemail.sync({ force: true }))
    .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'Hatemail\' table successfully created!'))
    .then(() => Promise.all(require('./fakeData.js').map((txn) => Users.create(txn))))
    .then((arr) => console.log('\x1b[32m', `\nDatabase (MySQL): Successfully seeded users with ${arr.length} entries!\n`, '\x1b[37m'))
    .then(process.exit);
};

seedSqlize();
