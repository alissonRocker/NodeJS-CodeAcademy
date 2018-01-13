// server.js
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const db = require("./db");
require("./passport");

express()
    .set("view engine", "hjs")
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(session({ secret: "i love dogs", resave: false, saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session())
    .use(authRoutes)
    .use(postsRoutes)
    .get("/", (req, res, next) => {
        res.send({
            session: req.session,
            user: req.user,
            authenticated: req.isAuthenticated
        });
    })
    .listen(3000);

/*
    TEST
    mysql
    CREATE TABLE posts (
        id integer primary key not null auto_increment,
        text varchar(100),
        user_id integer not null,
        foreign key (user_id) references users(id)
    );

    INSERT INTO posts (text, user_id) VALUES ("first post", 1), ("second post", 1), ("first post", 2);
*/