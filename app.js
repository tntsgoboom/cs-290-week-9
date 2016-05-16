var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var session = require('express-session');

app.use(session({secret:'SuperSecretPassword'}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3003);

app.use(express.static(__dirname + '/'));

app.get('/',function(req,res){
  var context ={};

  res.render('getStarted', context);
});

app.get('/Keys',function(req,res){
  var context ={};

  res.render('keys', context);
});

app.get('/ErrorCodes',function(req,res){
  var context ={};

  res.render('errorcodes', context);
});

app.get('/ExampleCall',function(req,res){
  var context ={};

  res.render('example', context);
});

app.get('/UsefulLinks',function(req,res){
  var context ={};

  res.render('usefullinks', context);
});

app.get('/destroysession',function(req,res){
  req.session.destroy();

  res.render('page2');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
