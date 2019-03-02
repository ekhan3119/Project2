/* var env = require('dotenv').load();
var express = require('express');
var routes = require('./routes');
var app = express();
var users = require('./routes/users');
var db = require('./models');
var http = require('http');
var passport = require('passport');
var passportConfig = require('./config/passport');
var home = require('./routes/home');
var application = require('./routes/application');

app.use('/public', express.static(__dirname + '/public'));
app.set('views', __dirname + '/view')

app.set('port', process.env.PORT || 8080);

app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.json());
app.use(express.session({ secret: 'aelapp', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router)

if ('development' === app.get('env')) {
    app.use(express.errorHandlers());
}

app.get('/', routes.index);

db
    .sequelize.sync()
    .complete(function (err) {

        if (err) {
            throw err[0]
        } else {
            http.createServer(app).listen(app.get('port'), function () {
                console.log('Express is listening on port ' + app.get('port'))
            })
        }
    }) */
var express = require('express');
var app = express();
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport

app.use(session({ secret: 'project2', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions
//Models
var models = require("./app/models");

//Sync Database
models.sequelize.sync().then(function () {

    console.log('Nice! Database looks fine')

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});

app.get('/', function (req, res) {

    res.send('Welcome to Passport with Sequelize');

});


app.listen(5000, function (err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});
