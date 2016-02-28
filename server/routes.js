const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

var setRoutes = function(app, auth) {
  app.get('/', ensureLoggedIn('/login'), function(req, res) {
    res.render('pages/chat', {username: req.user.username});
  });

  app.get('/login', ensureLoggedOut('/chat'), function(req, res) {
    res.render('pages/login', {error: false});
  });

  app.get('/login/out', ensureLoggedOut('/chat'), function(req, res) {
    res.render('pages/login',  {error: false});
  });

  app.get('/login/signup/success', ensureLoggedOut('chat'), function(req, res) {
    res.render('pages/login', {error: false});
  });

  app.get('/login/signup/invalid', ensureLoggedOut('cht'), function(req, res) {
    res.render('pages/login', {error: true});
  });

  app.get('/login/signup/alreadytaken', ensureLoggedOut('chat'), function(req, res) {
    res.render('pages/login', {error: true});
  });

  app.get('/login/signin/failure', ensureLoggedOut('/chat'), function(req, res) {
    res.render('pages/login', {error: true});
  });

  app.post('/signin', auth.passport.authenticate('local', {
        successRedirect : '/chat',
        failureRedirect : '/login/signin/failure'
  }));

  app.post('/signup', auth.newUser);

  app.get('/chat', ensureLoggedIn('/login'), function(req, res) {
    res.render('pages/chat', {username: req.user.username});
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login/out');
  });

  app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('404 not found');
  });
}

exports.setRoutes = setRoutes;
