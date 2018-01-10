// db.js
const knex = require("knex");

const db =knex({
    client: "mysql",
    connection: {
        user: "root",
        password: "root",
        database: "test"
    },
    pool: {
        min: 0,
        max: 2
    }
});

module.exports = db;
