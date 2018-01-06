// commonjs-modules/app.js
const math = require("./math");

var command = process.argv[2];
var a = Number(process.argv[3]);
var b = Number(process.argv[4]);

var value = math[command](a, b);

console.log(value);

/*
    Test
    node app add 10 10
    node app subtract 10 10
    node app multiply 10 10
*/
