const settings = require("../settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


//pull from heroku db (id, order_id, dessert_item_id, description, quantity)


// var id, order_id, dessert_item_id, description, quantity

var result = [];

knex.select("*") // id, order_id, dessert_item_id, description, quantity
.from('order_dessert_item')
.asCallback(function(err, rows) {

  //loop thur table looking for new orders?

  if (err) return console.error(err);
  let row = rows;
  console.log(row);
})
.then(function() {
    return knex.destroy();
})

//pull from heroku db (id, order_id, dessert_item_id, description, quantity)
//set column id to var
//insert data into restaurant order template