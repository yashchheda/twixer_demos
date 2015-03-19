var Twitter = require('twitter');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');


var client = new Twitter({
  consumer_key: 'dkUQyRH8WoBQt0BJS11i3ozpZ',
  consumer_secret: '5sKyrYsTEUclQrrXlrXu0DHd72TaUr5CXVN57DXE4IrGtRiDeR',
  access_token_key: '3094516680-Milo4MiykcS0KbEkxFQt8nKUcq7ZOhl1EOO6drG',
  access_token_secret: 'QdFX52AefYnvogJ0Y1kksAjBSaUZMX6HW7ToVnXVp3cq7'
});


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res){
   res.write("<!DOCTYPE html>\n");
   res.write("<html lang='en'>\n");
   res.write("<head>\n");
   res.write("<meta charset='utf-8'>\n");
   res.write("<title>Game</title>\n");
   res.write("</head>\n");
   res.write("<body>\n");
   res.write("<div class='container'>");
   res.write("<form method='POST' action='/post'>\n");
   res.write("<input type='text' name='post'><br/><br/>\n");
   res.write("<input type='submit' value='post'>\n");
   res.write("</form><br/>");
   res.write("</div>");
   res.write("<div style='margin-top:100px'>");
   res.write('<a class="twitter-timeline" href="https://twitter.com/CPSC_473" data-widget-id="578676005914550272">Tweets by @CPSC_473</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>');
    res.write("</div>");
    res.write("</body>\n");
    res.write("</html>\n");
    res.end();
});

app.post('/post', function(req, res){
  res.send('Check CPSC 473 twitter');
  //console.log(req.body.post);
  client.post('statuses/update', {status: req.body.post},  function(error, tweet, response){
    if(error) throw error;
    console.log("Posted at  "+tweet.user.screen_name);  // Tweet body.
    //console.log(response);  // Raw response object.
  });
});

app.listen(3000);
