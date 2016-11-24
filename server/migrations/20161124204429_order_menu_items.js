
exports.up = function(knex, Promise) {
  return Promise.all ([
    knex.schema.table('order_dessert_item', function (table) {
      table.increments();
      table.string('descriptions').unsigned();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_dessert_item')
  ])
};
