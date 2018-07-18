// var request = require("request");
var fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

console.log($.html());
//=> <h2 class="title welcome">Hello there!</h2>

//
// request({
//     uri: "https://finance.i.ua/azs/12/",
// }, function(error, response, body) {
//     console.log(body);
//     fs.writeFile(__dirname + "/trash/new.html", body, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//
//         console.log("The file was saved!");
//     });
//
// });



