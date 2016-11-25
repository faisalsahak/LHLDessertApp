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

  insert: (data) =>{
    console.log(data);
    knex.insert({'order_id': data.order_id }).into('order_dessert_item').asCallback(function (err, result){
      if (err) return console.log(err);
      console.log(result)
    })
  }

}
