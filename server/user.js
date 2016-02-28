const Sequelize = require('sequelize');
const database = require('./database');

var User = database.db.define('user', {
  username: {type: database.sequelize.STRING, allowNull: false},
  password: {type: database.sequelize.STRING, allowNull: false}}, {
  freezeTableName: true
});

database.checkConnection(function() {
  User.sync().then(
    function (err) {
      console.log('Sync');
    },
    function (err) {
      console.log('Error : Sync failed', err.message);
    });
});

var createUser = function(username, password, done) {
  User.create({username: username, password: password}).then(done);
}

var findById = function(id, done) {
  User.findById(id).then(done);
};

var findByUsername = function(username, done) {
  User.findOne({where: {username: username}}).then(done);
};

exports.createUser = createUser;
exports.findById = findById;
exports.findByUsername = findByUsername;
