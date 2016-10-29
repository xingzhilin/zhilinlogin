var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'public'))); 
app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'zhilin'
}));
app.use(function(req, res, next){
	if(req.session){
		next();
	}else{
		res.redirect('/login');
	}
});
app.get('/login', function(req, res){
	res.render('login');
});
app.post('/login', function(req, res){
	var user = req.body;
	console.log(user);
	if(user.username == user.password){
		req.session.username = user.username;
		req.session.password = user.password;
		res.redirect('/user');
	}else{
		res.redirect('back');
	}
});
app.get('/user', function(req, res){
	if(req.session && req.session.username){
		res.render('user', {username: req.session.username,password: req.session.password })
	}else{
		res.redirect('/login');
	}
});


app.listen(8787);