// running-files/app.js
var command = process.argv[2];
var a = Number(process.argv[3]);
var b = Number(process.argv[4]);

if(command === "add") {
    console.log(a+b);
} else if(command === "subtract") {
    console.log(a-b);
} else if(command === "multiply") {
    console.log(a*b);
}

/*
    Test
    node app add 10 10
    node app subtract 10 10
    node app multiply 10 10
*/
