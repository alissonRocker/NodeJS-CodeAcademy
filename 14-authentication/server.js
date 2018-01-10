// server.js
const express    = require("express");
const bodyParser = require("body-parser");
const session    = require("express-session");
const passport   = require("passport");
const db         = require("./db");
require("./passport");

express()
    .set("view engine", "hjs")
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(session({secret: "i love dogs", resave: false, saveUninitialized: false}))
    .use(passport.initialize())
    .use(passport.session())
    .get("/", (req, res, next) => {
        res.send({
            session: req.session,
            user: req.user,
            authenticated: req.isAuthenticated
        });
    })
    .get("/login", (req, res, next) => {
        res.render("login");
    })
    .post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }))
    .get("/logout", (req, res, next) => {
        req.session.destroy((err) => {
            res.redirect("/login");
        });    
    })
    .get("/signup", (req, res, next) => {
        res.render("signup");    
    })
    .post("/signup", passport.authenticate("local-register", {
        successRedirect: "/",
        failureRedirect: "/signup"   
    }))
    .listen(3000);

/*
    TEST
    mysql

ALTER TABLE users add column email varchar(100), add column first_name varchar(30), add column last_name varchar(30), add column password varchar(80);
*/