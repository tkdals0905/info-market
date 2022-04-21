const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const User = require('./user');
const Info = require('./info');
const Reply = require('./reply');
const Admin = require('./admin');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;

db.User = User;
db.Info = Info;
db.Reply = Reply;
db.Admin = Admin;

User.init(sequelize);
Info.init(sequelize);
Reply.init(sequelize);
Admin.init(sequelize);

User.associate(db);
Info.associate(db);
Reply.associate(db);

module.exports = db;