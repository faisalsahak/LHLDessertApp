const settings = require("./settings.json");


const knex = require("knex")
({
    client: 'pg',
    connection: {
      database: settings.database,
      user: settings.user,
      port: settings.port,
      password: settings.password,
      host: settings.hostname,
      ssl: settings.ssl
    }
  });


console.log(settings.database);




knex.select('*')
.from('menu_items')
.asCallback(function(err, result) {
  if (err) {
    return console.error("error running", err);
  }
  return console.log("connecting properly", result);
});

knex.insert('')
.into('')
.asCallback(function  (err, result) {
  if (err) {
    return console.error ("error", err);
  }
  console.log('done');
})

function insertOrder(knex, data) {
  console.log(data);
  knex.insert({'order_id': data.id }).into('order_dessert_item')
}
