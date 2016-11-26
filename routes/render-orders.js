const settings = require("../settings.json");


const knex = require("knex")({
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
    knex.select('id', 'order_id', 'dessert_item_id', 'quantity')
    .from('order_dessert_item')
    .orderBy('order_id', 'desc')
    // .limit(1) //made changes, was 4
    .then(function(rows){
      var orders = {};
      // console.log(rows);
      // Let's restructure the data; it was in relational style, it will be in JS style
      rows.forEach((row, index) => {
        if (!orders[row.order_id]) {
          orders[row.order_id] = { order_id: row.order_id, items: [] };
        }
        var item = {id: row.id, recipe_id: row.dessert_item_id, quantity: row.quantity /*, name: "FOOD"*/ }
        orders[row.order_id].items.push(item)
      })

      // console.log(orders);
      cb(null, orders);
    })
    .catch(function(err){
      cb(err);
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
    console.log("dataaaaaaaaaaaa",data);
    knex.insert({})
    .into('order_table')
    .returning('id')
    .asCallback(function(error, result) {
      if (error) {
        cb(error);
      }
      let order_id = parseInt(result[0]);
      let count = 0;
      data.forEach(function(menuItem) {
        knex.insert({
          'order_id': order_id,
          'dessert_item_id': menuItem.dessert_item_id,
          'quantity': menuItem.foodQuantity })
        .into('order_dessert_item')
        .asCallback(function(error, result) {
          if (error) {
            cb(error);
          }
          count += 1;
          if(count === data.length) {
            cb(error, result);
          }
        });
      });
    });
  }

}
