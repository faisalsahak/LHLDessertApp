const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser    = require("body-parser");
// Middleware //
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
// Routes //


//twilio Settings
// const twiliosettings = require("./twilio/twilio_sms");
// var accountSid = '/twilio/twilio_sms.accountSid';
// var authToken = '/twilio/twilio_sms.authToken';
//var myclient = new twilio.RestClient(accountSid, authToken);

const client = require('twilio')('ACdb7f78ac4f8d7daf206ea336c1dde288','205f30c8b12a4c0f4da4b5b5f2a2cf3a');

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/confirm-order", (req, res) => {
  console.log("confirm-order!");

  res.render('render Confirmation ejs page')

});


app.get("/menu", (req, res) => {
  console.log("Testing button");

  res.render('menu');
});

app.get("/current-orders", (req, res) => {
  res.render("current_orders.ejs");

  res.render("");

});


app.post("/sendOrder", (req, res) => {
  client.sendMessage({
        to: '+17787923077',
        from: '+16042394685',
        body: 'hello'
      }, function(err, data){
        if (err) console.log(err);
        console.log(data)
      });
res.send('hello');
    });




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
