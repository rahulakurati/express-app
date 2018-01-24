var express = require("express");
var session = require('express-session');
var request = require('request');

var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var path1 = require('path');
var path = __dirname + '/views/';
var UserManage = require(__dirname + '/controllers/UserManage.js');

app.use('/public', express.static(path1.join(__dirname, 'static')));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
});
/*router.get("/getparam/:src/:dest/:from/:to",function (req,res)
{
  var src= req.params.src;
  var dest=req.params.dest;
  //var from=req.body.sdate;
  //var to=req.body.rdate;
    var from='2018-01-23';
    var to='2018-01-27';
    var URL = "https://api.test.sabre.com/v1/shop/flights?origin="+src+"&destination="+dest+"&departuredate="+from+"&returndate="+to+"&onlineitinerariesonly=N&limit=20&offset=20&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US";
   // var URL = "https://api.test.sabre.com/v1/shop/flights?origin=JFK&destination=LAX&departuredate=2018-04-07&returndate=2018-04-08&onlineitinerariesonly=N&limit=10&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US";

    var TOKEN = "T1RLAQKw+Es2aBz9QXGKbsR2RnsZYZIo5BCxzo4KihY8/0eYZwdgPPOmAADAyMkyFeE4/vpsIG9lba+QZjraHMJ2HrWVAVloRo9fwLxs+bQLxQdMtvJ2tabMKXNOb4bDiDdijbprpjkSSvvLJXoTp4EGJsT945KdnXnkArtdpAh5aPI9NWqrq94YvpdRPRT9mDKNOju7Bhr+BR5UfnoDxDRaQaWR/dRIwAHn4SZi+j9TIgIF3xMKq+FkAL6GCc12899IuYbM0ji+q+gjjJzLj+WIVKgqJK5ljWD66eezi4o3FeE2MI+wK0S322EL";
    request.get({
        url: URL,
        headers:{
            "Authorization": "Bearer "+TOKEN
        }
    }, function(error, response, body)
    {

        if (!error && response.statusCode == 200) {
            // var da=response.body.PricedItineraries;
            var data=JSON.parse(response.body);
            var count =Object.keys(data).length;
            console.log(count);
            for(var i=0 ;i<count ;i++)
            {
                res.json(data);
               // res.json(data.PricedItineraries['0'].AirItineraryPricingInfo.FareInfos.FareInfo);
            }

            //res.json(JSON.parse(response.body));
        }
    });
});*/
router.get("/getparam/:src/:dest/:from/:to/:tclass",function (req,res)
{
    var src= req.params.src;
    var dest=req.params.dest;
    var from=req.params.sdate;
    var to=req.params.rdate;
    //class could be ECONOMY,BUSINESS
    var  travelClass=req.params.tclass;
    var apikey='6tAWCV3A5UDIM8efBLcYoLV79kAPXzoA';
    var URL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey="+apikey+"&origin="+src+"&destination="+dest+"&departure_date="+from+"&return_date="+to+"&travel_class="+travelClass+"&number_of_results=2";

    request.get({
        url: URL,
    }, function(error, response,body)
    {

        if (!error && response.statusCode == 200)
        {
            var data=JSON.parse(response.body);
            var count=Object.keys(data.results).length;
            for(var i=0 ;i<count ;i++)
            {

                res.json(data.results[i].itineraries);
            }

            //res.json(JSON.parse(response.body));
        }
    });
});

router.get("/user", UserManage.validate_user);

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});


app.listen(8081,function(){
  console.log("Listening at port 8081.");
});