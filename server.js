const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

// Middleware //



// Routes //
app.get("/", (req, res) => {
  res.send("Hey you!");
});

app.post("/", (req, res) => {

});

app.get("/menu", (req, res) => {

});

app.put("/menu", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});