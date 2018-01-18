var express = require("express");
var session = require('express-session');
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

router.get("/user", UserManage.validate_user);

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});


app.listen(8081,function(){
  console.log("Listening at port 8081.");
});