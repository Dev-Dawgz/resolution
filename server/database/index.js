const { Sequelize, DataTypes } = require('sequelize');

// Create sequelize connection to mysql database
const sequelize = new Sequelize({
  host: '127.0.0.1',
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'resolution'
});

// Declare our schema. This is the shape of our data
const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: DataTypes.STRING(100),
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  trophy: {
    type: DataTypes.STRING(100),
    defaultValue: 'Earn some points!',
    allowNull: false
  },
  email: DataTypes.STRING(100),
  picture: DataTypes.STRING(100),
  googleId: DataTypes.STRING(100),
  status: DataTypes.STRING(100)
}, { timestamps: true });

const Rewards = sequelize.define('Rewards', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  stickerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  keyword: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  stickerImg: {
    type: DataTypes.STRING(100)
  },
  price: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {timestamps: true});

const UsersRewards = sequelize.define('UsersRewards', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  rewardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Rewards,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  }
});

const Conversations = sequelize.define('Conversations', {
  userOneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  userTwoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id'
    }
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
}, {timestamps: true});

const Messages = sequelize.define('Messages', {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id'
    }
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Conversations,
      key: 'id'
    }
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  img: {
    type: DataTypes.STRING(100)
  },
  isPositive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, { timestamps: true });

const Void = sequelize.define('Void', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  likes: DataTypes.INTEGER
}, {timestamps: true});

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  headline: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
}, {timestamps: true});

const Mailboxes = sequelize.define('Mailboxes', {
  userOneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  userTwoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id'
    }
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
}, {timestamps: true});

const Hatemail = sequelize.define('Hatemail', {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id'
    }
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Mailboxes,
      key: 'id'
    }
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  mail: {
    type: DataTypes.STRING(100)
  }
}, { timestamps: true });

Hatemail.belongsTo(Users, {
  foreignKey: 'senderId',
  as: 'sender'
});

Hatemail.belongsTo(Users, {
  foreignKey: 'recipientId',
  as: 'recipient'
});
module.exports = {
  db: sequelize,
  Users,
  Messages,
  Conversations,
  Void,
  News,
  Hatemail,
  Mailboxes,
  Rewards,
  UsersRewards,
};
