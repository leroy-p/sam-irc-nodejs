const Sequelize = require('sequelize');

const db = new Sequelize('san_irc_nodejs', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

var checkConnection = function(done) {
  db.authenticate().then(done());
};

exports.sequelize = Sequelize;
exports.checkConnection = checkConnection;
exports.db = db;
