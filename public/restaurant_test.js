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



knex.select("id", 'dessert_items') // id, order_id, dessert_item_id, description, quantity
.from('menu_items')
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  let row = rows[0];

  console.log(row);
  console.log(row.id + " " + row.dessert_items + " ");
})
.then(function () {
    return knex.destroy();
})


//pull from heroku db (id, order_id, dessert_item_id, description, quantity)
//set column id to var
//insert data into restaurant order template