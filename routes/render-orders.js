const settings = require("../settings.json");


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


module.exports = {

  lookup: (cb) => {
    var results = [];
    console.log("into knexxxx");
    knex.select("*")
        .from("dessert_items")
        .then(function(rows){
          results = rows;
          cb(results);
        });
  },

  render: (data, cb) => {
      let rendered = data.map(function (obj){
        let type = obj.type;
        let order = `${type}`;
        return order;
});
 cb(rendered);
},

delete: (cb) => {
  knex.del().from("dessert_items").then(cb("Success"));
},

insert: (data, cb) =>{
  console.log(data);
  knex.insert({}).into('order_table').returning('id').asCallback(function(error, result) {
    let count = 0;
    data.forEach(function(menuItem) {
      knex.insert({
        'order_id': parseInt(result[0]),
        'dessert_item_id': menuItem.dessert_item_id,
        'quantity': menuItem.foodQuantity })
      .into('order_dessert_item')
      .asCallback(function(error, result) {
        count += 1;
        if(count === data.length) {
          cb(error, result);
        }
      });
    });
  });
}

}
