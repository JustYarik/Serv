var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/about', function (req, res) {
    res.render('about');
});


app.get('/news/:id', function (req, res) {
    var obj = { title: "newsTitle", id: 4, paragraphs: ['par-h', 'simple text', ]}
    res.render('news', {newsID: req.params.id, obj: obj})
});

app.listen(3000);
console.log('index 15.js');
console.log('server started, listen port 3000');
