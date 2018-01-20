var express = require("express");
var session = require('express-session');
var request = require('request');
var app = express();
var router = express.Router();
var path1 = require('path');
var path = __dirname + '/views/';
var UserManage = require(__dirname + '/controllers/UserManage.js');

app.use('/public', express.static(path1.join(__dirname, 'static')));

router.use(function (req,res,next) {
  console.log("/" + req);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/search",function(req,res){
  res.sendFile(path + "search.html");
});

router.get("/results",function(req,res){
  res.sendFile(path + "results.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});
router.get("/myplans",function(req,res){
    res.sendFile(path + "myPlans.html");
});
router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});
router.get("/search/:source",function(req,res){
  var URL = "https://api.test.sabre.com/v1/shop/flights?origin=JFK&destination=LAX&departuredate=2018-04-07&returndate=2018-04-08&onlineitinerariesonly=N&limit=10&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US";
  var TOKEN = "T1RLAQKw+Es2aBz9QXGKbsR2RnsZYZIo5BCxzo4KihY8/0eYZwdgPPOmAADAyMkyFeE4/vpsIG9lba+QZjraHMJ2HrWVAVloRo9fwLxs+bQLxQdMtvJ2tabMKXNOb4bDiDdijbprpjkSSvvLJXoTp4EGJsT945KdnXnkArtdpAh5aPI9NWqrq94YvpdRPRT9mDKNOju7Bhr+BR5UfnoDxDRaQaWR/dRIwAHn4SZi+j9TIgIF3xMKq+FkAL6GCc12899IuYbM0ji+q+gjjJzLj+WIVKgqJK5ljWD66eezi4o3FeE2MI+wK0S322EL";
  request.get({ 
    url: URL,
    headers:{
      "Authorization": "Bearer "+TOKEN
    } 
  }, function(error, response, body){
    console.log(response);
    if (!error && response.statusCode == 200) { 
      res.json(body); 
    } 
  });
})

router.get("/user", UserManage.validate_user);

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});


app.listen(8081,function(){
  console.log("Listening at port 8081.");
});