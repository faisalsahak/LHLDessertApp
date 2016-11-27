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
    // 93
    knex('order_dessert_item').max('order_id')
    .then(function(rows) {
      var maxOrderId = rows[0].max;
      knex.select('id', 'order_id', 'dessert_item_id', 'quantity')
          .from('order_dessert_item')
          .orderBy('order_id', 'desc')
          .where('order_id',  maxOrderId)
          .then(function(rows){
                var orders = {};
      // Let's restructure the data; it was in relational style, it will be in JS style
                rows.forEach((row, index) => {
                console.log("rows found here:", row);
                if (!orders[row.order_id]) {
                  orders[row.order_id] = { order_id: row.order_id, items: [] };
                }
                var item = {id: row.id, recipe_id: row.dessert_item_id, quantity: row.quantity /*, name: "FOOD"*/ }
                orders[row.order_id].items.push(item)
                });
                cb(null, orders);
          })
          .catch(function(err){
            cb(err);
            });
    });
  },

  // render: (data, cb) => {
  //     let rendered = data.map(function (obj){
  //       let type = obj.type;
  //       let order = `${type}`;
  //       return order;
  // });
  //   cb(rendered);
  // },

  delete: (knex, cb) => {
    knex.del('order_id').from("order_dessert_items").where('order_id').then(cb("item DELETED"));
  },

  insert: (data, cb) =>{
    console.log("Data being insterted into the DB: ", data);
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
        console.log("menu item list:", menuItem);
        knex.insert({
          'description' : menuItem.foodName,
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
