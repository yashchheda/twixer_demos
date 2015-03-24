var express = require('express');
var session		=	require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var obj=JSON.parse(fs.readFileSync('./sample.json', 'utf8'));
var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.get('/',function(req,res){
	sess=req.session;
	if(sess.email)
	{
		res.redirect('/admin');
	}
	else{
	res.render('index.html');
	}
});

app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);


var result="none";
var sess;

var html_dir = './public/';

function logincheck(obj,req,result)
{

  var username=req.body.email;
  var password=req.body.pwd;
  for(var users in obj.users){
    var json_username=obj.users[users].email;
    var json_pwd=obj.users[users].password;
      if(json_username===username && json_pwd===password)
      {
        result="success";
        break;
      }
  }
  return result;
}
app.get('/',function(req,res){
  console.log("here");
  sess=req.session;
	if(sess.email)
	{
    console.log("here")
		res.redirect('/admin');
	}
	else{
	res.render('index.html');
}
});

app.post('/login', function(req, res) {

    var logincheck_result=logincheck(obj,req,result);
    if(logincheck_result==="success")
    {
      sess=req.session;
	    sess.email=req.body.email;

    }
    res.redirect("/admin");
})

app.get('/admin',function(req,res){
	sess=req.session;
	if(sess.email)
	{
		res.render("home.html");
	}
	else
	{
		res.redirect("/");
	}

});
app.get('/logout',function(req,res){

	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});

});
app.get('/register',function(req,res){
  res.render("register.html");

});
app.post('/register',function(req,res){
  obj.users.push(req.body);
  res.render("register.html");
  console.log(obj);
});
app.post('/userinfo',function(req,res){
  sess=req.session;

  for(var users in obj.users){

    var json_email=obj.users[users].email;
    var sess_email=sess.email;
      if(json_email===sess_email)
      {
        result="success";
        console.log(obj.users[users]);
        res.json(obj.users[users]);
        break;
      }

  }
});
app.listen(3000);
