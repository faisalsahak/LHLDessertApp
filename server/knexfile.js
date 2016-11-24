const settings = require("./settings.json");


const knex = require("knex");

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: settings.database,
      user: settings.user,
      port: settings.port,
      password: settings.password,
      host: settings.hostname,
      ssl: settings.ssl
    }
  }
}
