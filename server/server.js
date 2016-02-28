
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const routes = require('./routes');
const auth = require('./auth');
const socket = require('./socket')

const app = express();
const port = 8080;
const sessionMiddleware = expressSession({
  secret: 'super-secret-irc',
  resave: false,
  saveUninitialized: false
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(auth.passport.initialize());
app.use(auth.passport.session());
routes.setRoutes(app, auth);

const server = app.listen(8080);
socket.setSockets(server);
