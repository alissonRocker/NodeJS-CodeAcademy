// server.js
const express    = require("express");
const bodyParser = require("body-parser");
const knex       = require("knex"); // construtor de consultas (mapeamento relacional de objetos)

const db = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "root",
        database: "test"
    },
    pool: {
        min: 1,
        max: 2
    }
});

express()
    .use(bodyParser.json())
    .get("/users", (req, res, next) => {
        db("users").then((users) => {
            res.send(users);
        }, next);
    })
    .post("/users", (req, res, next) => {
        db("users")
            .insert(req.body)
            .then((userIds) => {
                res.send(userIds)
            }, next)
        ;    
    })
    .get("/users/:id", (req, res, next) => {
        const { id } = req.params;

        db("users")
            .where("id", id)
            .first()
            .then((users) => {
                if(!users) {
                    return res.send(400);
                }
                res.send(users);
            }, next)
        ;
    })
    .put("/users/:id", (req, res, next) => {
        const { id } = req.params;
        
        db("users")
            .where("id", id)
            .update(req.body)
            .then((result) => {
                if(result === 0) {
                    return res.send(400);
                }
                res.send(200);
            }, next)
        ;
    })
    .delete("/users/:id", (req, res, next) => {
        const { id } = req.params;

        db("users")
            .where("id", id)
            .delete()
            .then((result) => {
                if(result === 0) {
                    return res.send(400);
                }
                res.send(200);
            }, next)   
        ;
    })
    .listen(3000);

/*
    TEST
    Mysql
    create schema test;
    use test;
    CREATE TABLE users (id integer primary key, username varchar(30));
    INSERT INTO users (id, username) VALUES (1, "Alisson"),(2, "Jaqueline"),(3, "Will"),(4, "Fernando"),(5, "Vitor");

    GET /users show all users
    GET /users/:id show an user
    POST /users create user
    PUT /users/:id update an user
    DELETE /users/:id delete an user
*/