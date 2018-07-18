var express = require('express');
var app = express();
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + "/about.html");
});


app.get('/news/:id', function (req, res) {
    var obj = { title: "newsTitle", id: 4, paragraphs: ['par-h', 'simple text', ]}
    res.render('news', {newsID: req.params.id, obj: obj})
});

app.listen(3000);
console.log('server started, listen port 3000');
