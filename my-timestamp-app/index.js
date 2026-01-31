// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');

});
//new endpoint 
//API Project: Request Header Parser Microservice
app.get("/api/whoami", function(req,res){
  // console.log(req.headers); 
  // consoled to know re.headers and found accept-language under language and user-agent as software

   let language = req.headers['accept-language'];
   let software = req.headers['user-agent'].split('(')[1].split(')')[0];
   //"software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36"
   //.split('(')[1] Keeps everything inside and after the first parenthesis.
   //split(')')[0]): Takes that result and keeps only what was before the closing parenthesis.
   let ipaddress = req.ip;
  res.json({ ipaddress: ipaddress, language: language, software: software});
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
