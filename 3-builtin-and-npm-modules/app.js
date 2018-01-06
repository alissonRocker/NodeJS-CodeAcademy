// app.js
const _     = require("lodash"); // biblioteca js que oferece modularidade, desempenho e extras
const axios = require("axios"); // Client http baseado em promisse para o navegador

axios.get("http://rest.learncode.academy/api/myuser/friends").then((res) => {
    var jake = _.find(res.data, {name: "Jake"});
    console.log(jake);
});
