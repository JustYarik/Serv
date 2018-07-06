var express = require('express');
var bodyParcer = require('body-parser');
// var ejs = require('ejs');
var dbFunctions = require('./DBfunctions');

var app = express();

var urlencoderParser = bodyParcer.urlencoded({extended: false});

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));


app.get('/', function (req, res) {
    res.render('login');
});

app.post('/login', urlencoderParser, function (req, result) {
    if (!req.body) return result.sendStatus(400);
    console.log(req.body); // { email: 'JustYarik@gmail.com', pass: '1' }

    if (req.body.email && req.body.sysUserCheck)  {
            dbFunctions.getSysUserLogin(function (res) {
            // console.log(res);        // do not remove
            if (res.length !== 0) {
                console.log('for system user '+ req.body.email+ ' access ALLOWED');
                result.render('sysUserCabinet' , {data: req.body});
            }
            else {
                result.send('Login or password are wrong');
                console.log('for system user '+ req.body.email+ ' access DENIED');
            }
        }
        , req.body.email
        , req.body.pass );
    }

    if (req.body.email && !req.body.sysUserCheck)  {
        dbFunctions.getClientLogin(function (res) {
                // console.log(res);        // do not remove
                if (res.length !== 0) {
                    console.log('for user '+ req.body.email+ ' access ALLOWED');
                    result.render('clientCabinet' , {data: req.body});
                }
                else {
                    result.send('Login or password are wrong');
                    console.log('for user '+ req.body.email+ ' access DENIED');
                }
            }
            , req.body.email
            , req.body.pass );
    }
});

app.post('/newOrderFromClient', urlencoderParser, function (req, result) {
    if (!req.body) return result.sendStatus(400);
    let ft ='';
    if (req.body.f95){ft = '95'};

    let psType ='';
    if (req.body.psWOG) {psType = 1} else { psType = 2}


    console.log('new order');
    console.log(req.body);
    // result.send('order accepted')
    if (req.body.orderQuantity && (req.body.psWOG || req.body.psWOG ) ) {
        dbFunctions.makeNerOrder(function (res) {
                console.log(res);
            }
            , req.body.email
            , req.body.orderQuantity
            , ft
            , psType
        );
        result.render('clientCabinet', {data: req.body});
    }

});

// function fuelTypeSelector(ft){
//    let fft = '';
//    switch (ft) {
//        case 'f95': fft = 95; break;
//        case 'f92': fft = 92; break;
//     }
//     return fft;
// }

// app.post('/about', urlencoderParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400);
//     console.log(req.body);
//     res.render('about-success', {data: req.body});
// });


// app.get('/news/:id', function (req, res) {
//     var obj = { title: "newsTitle", id: 4, paragraphs: ['par-h', 'simple text', ]};
//     console.log(req.query);
//     res.render('news', {newsID: req.params.id, obj: obj})
// });

app.listen(3000);
console.log('fuelMain.js');
console.log('server started, listening port 3000');



