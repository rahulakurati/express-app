var express = require("express");
var session = require('express-session');
var request = require('request');
var app = express();
var router = express.Router();
var path1 = require('path');
var path = __dirname + '/views/';
var airportList= require('airport-codes').toJSON();
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

router.get("/getflight/:src/:dest/:from/:to/:tclass",function (req,res)
{
    var src= req.params.src;
    var dest=req.params.dest;
    var from=req.params.from;
    var to=req.params.to;
    //class could be ECONOMY,BUSINESS
    var  travelClass=req.params.tclass;
    var apikey='6tAWCV3A5UDIM8efBLcYoLV79kAPXzoA';
    var FLIGHT_URL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey="+apikey+"&origin="+src+"&destination="+dest+"&departure_date="+from+"&return_date="+to+"&travel_class="+travelClass+"&number_of_results=2";
    // var URL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=6tAWCV3A5UDIM8efBLcYoLV79kAPXzoA&origin=BOS&destination=LON&departure_date=2018-01-25&return_date=2018-01-28&travel_class=ECONOMY&number_of_results=2";
    var HOTEL_URL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="+apikey+"&location="+dest+"&check_in="+from+"&check_out="+to;
    console.log(FLIGHT_URL);
    request.get({
        url: FLIGHT_URL,
    }, function(error,response,body)
    {
      if (!error && response.statusCode == 200)
      {
          var data=JSON.parse(body);
          var count=Object.keys(data.results).length;
          var resultObject = [];
          var finalResult = new Object();
          finalResult.from=data.results[0].itineraries[0]["outbound"]["flights"][0]["departs_at"];
          finalResult.to=data.results[0].itineraries[0]["inbound"]["flights"][0]["departs_at"];
          finalResult.src=data.results[0].itineraries[0]["outbound"]["flights"][0]["origin"]["airport"];
          finalResult.dest=data.results[0].itineraries[0]["outbound"]["flights"][0]["destination"]["airport"];
          finalResult.total_fare=data.results[0]["fare"]["total_price"];
          finalResult.outbound_marketing_airline =data.results[0].itineraries[0]["outbound"]["flights"][0]["marketing_airline"];
          finalResult.inbound_marketing_airline=data.results[0].itineraries[0]["inbound"]["flights"][0]["marketing_airline"];
          resultObject.push(finalResult);
          res.json(resultObject);
      }
      else{
        console.log(response.statusCode);
        console.log(response.statusMessage);
      }
    });
});

router.get("/gethotel/:dest/:from/:to",function (req,res)
{
    var dest=req.params.dest;
    var from=req.params.from;
    var to=req.params.to;
    
    var apikey='6tAWCV3A5UDIM8efBLcYoLV79kAPXzoA';
    var HOTEL_URL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="+apikey+"&location="+dest+"&check_in="+from+"&check_out="+to;
    request.get({
        url: HOTEL_URL,
    }, function(error,response,body)
    {
      if (!error && response.statusCode == 200)
      {
        var data=JSON.parse(body);
        var count=Object.keys(data.results).length;
        res.json(data);
      }
      else{
        console.log(response.statusCode);
        console.log(response.statusMessage);
      }
    });
});
router.get("/airportName",function (req,res)
{
    console.log('1');
    var count=airportList.length;
    var listOfObjects = [];
    for(var i=0 ;i<count ;i++)
    {
        var airport = new Object();
        airport.city= airportList[i].city;
        airport.iata= airportList[i].iata;

        listOfObjects.push(airport);
    }
    res.json(listOfObjects);

});

router.get("/user", UserManage.validate_user);

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});


app.listen(8081,function(){
  console.log("Listening at port 8081.");
});