const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser    = require("body-parser");
const confirmOrders = require("./routes/confirm-orders");
const renderOrder   = require("./routes/render-orders");


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const orders = [];

// Routes //

const client = require('twilio')('ACdb7f78ac4f8d7daf206ea336c1dde288', '205f30c8b12a4c0f4da4b5b5f2a2cf3a');
const cheff = require('twilio')('AC4549a415945c0a203b92dd0f0ba9fc68', '9e0a55137495a9dbaca5878dcd7be75b');


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/confirm-order", (req, res) => {

  let time = req.body.timeBox;
  cheff.sendMessage({
    to: '+16048809542',
    from: '+17786554043',
    body: "Your order will be ready in: " + time + " mins."
  }, function(err, data){
    if (err) {
      console.log(err);
      res.status(500).send("TWILIO IS FUCKED");
    }
  });
  res.redirect('/restaurant');
});

app.get("/menu", (req, res) => {
  res.render('menu');
});

app.post("/sendOrder", (req, res) => {

  let myOrder = JSON.parse(req.body.order);
  let testOrder = req.body;

  renderOrder.insert(myOrder, function(error, result) {
    if (error) {
      res.status(500).send("DB IS FUCKED");
      return;
    }
    client.sendMessage({
      to: '+17787923077',
      from: '+16042394685',
      body: 'Order up!'
    }, function(err, data){
      if (err) {
        console.log(err);
        res.status(500).send("TWILIO IS FUCKED");
      } else {
        res.send();
      }
    });
  });
});

app.get("/restaurant", (req, res) => {
  renderOrder.lookup((err, data) => {
    if (err) {
      res.status(500).send("THE UNIVERSE IS SCARY:" + JSON.stringify(err));
    } else {
      res.render("restaurant", {orders: data});
    }
  });
});

app.post('/delete', (req, res) => {

  let id = req.body;
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
