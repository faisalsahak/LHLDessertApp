const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser    = require("body-parser");
const confirmOrders = require("./routes/confirm-orders");
const renderOrder   = require("./routes/render-orders");


// const jsFile = require('./public/scripts/app.js');

// const jsFile        = require('./public/scripts/app');

// Middleware //
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

const orders = [];


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




// app.get('/dummyPage', (req, res) => {
//
//   res.render("mytemp");
// });
//
// app.post('/dummyPage', (req, res) =>{
//   let orderId = req.body.text;
//   console.log("order iddddddd", orderId);
//
//   let order = { order_id: orderId};
//
//   renderOrder.insert(order);
//
//
//   console.log("confirm-order!");
//
// });




app.get("/confirm-order", (req, res) => {

});


app.get("/menu", (req, res) => {
  console.log("Testing button");

  res.render('menu');
});

//info from the cart to be sent to this route
// app.post('/orders', function (req, res) {
//     // retrieve user posted data from the body
//     const order = req.body
//     orders.push({
//
//       cart: order.items;
//     })
//     res.send('successfully sent')
// })


app.post("/sendOrder", (req, res) => {
  console.log(req.body);
  let myOrder = JSON.parse(req.body.order);

  renderOrder.insert(myOrder, function(error, result) {
    // heandle error
    client.sendMessage({
          to: '+17787923077',
          from: '+16042394685',
          body: 'hello'
        }, function(err, data){
          if (err) console.log(err);
          console.log(data)
        });
    //res.redirect('/menu');
  });
});




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
