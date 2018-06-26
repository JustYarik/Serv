var express = require('express');
var bodyParcer = require('body-parser');


var app = express();

var urlencoderParser = bodyParcer.urlencoded({extended: false});

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));


app.get('/', function (req, res) {
    res.render('login');
});

app.post('/login', urlencoderParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.render('about-success', {data: req.body});
});



// app.post('/about', urlencoderParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400);
//     console.log(req.body);
//     res.render('about-success', {data: req.body});
// });






// app.get('/about', function (req, res) {
//     res.render('about');
// });



// app.get('/news/:id', function (req, res) {
//     var obj = { title: "newsTitle", id: 4, paragraphs: ['par-h', 'simple text', ]};
//     console.log(req.query);
//     res.render('news', {newsID: req.params.id, obj: obj})
// });

app.listen(3000);
console.log('index 17.js');
console.log('server started, listen port 3000');



