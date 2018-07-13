var express = require('express');
var bodyParcer = require('body-parser');
// var ejs = require('ejs');
var dbFunctions = require('../DBfunctions');

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
                console.log('for SYSTEM user '+ req.body.email+ ' access ALLOWED');
                result.render('sysUserCabinet' , {data: req.body});
            }
            else {
                result.send('Login or password are wrong');
                console.log('for SYSTEM user '+ req.body.email+ ' access DENIED');
            }
        }
        , req.body.email
        , req.body.pass );
    }

    if (req.body.email && !req.body.sysUserCheck)  {
        dbFunctions.getClientLogin(function (res) {
            let orderID = [] ;
            let orderorderQuontity =[];
            let orderFuelType = [];
            let orderPatrolStationType = [];
            let orderDate = [];

                // console.log(res);        // do not remove
                if (res.length !== 0) {
                    console.log('for CLIENT '+ req.body.email+ ' access ALLOWED');

                    dbFunctions.getClientOrders(function (ress) {
                            for (let h = 0; h < ress[3].length; h++) {
                                // console.log(ress[h].orderID, ress[h].orderQuontity, ress[h].orderFuelType, ress[h].orderPatrolStationType, ress[h].orderDate);
                                orderID[h] = ress[3][h].orderID ;
                                orderorderQuontity[h] =ress[3][h].orderQuontity ;
                                orderFuelType[h] = ress[3][h].orderFuelType;
                                orderPatrolStationType[h] = ress[3][h].orderPatrolStationType;
                                orderDate[h] = ress[3][h].orderDate.getFullYear()+'-'+ress[3][h].orderDate.getMonth()+'-'+ ress[3][h].orderDate.getDate()+'  '+ress[3][h].orderDate.getHours()+':'+ress[3][h].orderDate.getMinutes();

                            }
                            let obj = {
                                data: req.body,
                                ordersID: orderID,
                                orderorderQuontity: orderorderQuontity,
                                orderFuelType: orderFuelType,
                                orderPatrolStationType: orderPatrolStationType,
                                orderDate: orderDate,
                                pageNumber: 0
                            };
                            // console.log(orderDate);
                            // console.log(obj.orders);
                            result.render('clientCabinet' , obj)
                            // console.log(orderList);
                        }
                        , req.body.email
                        , 0);

                }
                else {
                    result.send('Login or password are wrong');
                    console.log('for CLIENT '+ req.body.email+ ' access DENIED');
                }
            }
            , req.body.email
            , req.body.pass );

    }
});

app.post('/clientCabinet', urlencoderParser, function (req, result) {
    if (req.body.PageNumber){
        let orderID = [] ;
        let orderorderQuontity =[];
        let orderFuelType = [];
        let orderPatrolStationType = [];
        let orderDate = [];
        dbFunctions.getClientOrders(function (ress) {
                for (let h = 0; h < ress[3].length; h++) {
                    // console.log(ress[h].orderID, ress[h].orderQuontity, ress[h].orderFuelType, ress[h].orderPatrolStationType, ress[h].orderDate);
                    orderID[h] = ress[3][h].orderID ;
                    orderorderQuontity[h] =ress[3][h].orderQuontity ;
                    orderFuelType[h] = ress[3][h].orderFuelType;
                    orderPatrolStationType[h] = ress[3][h].orderPatrolStationType;
                    orderDate[h] = ress[3][h].orderDate.getFullYear()+'-'+ress[3][h].orderDate.getMonth()+'-'+ ress[3][h].orderDate.getDate()+'  '+ress[3][h].orderDate.getHours()+':'+ress[3][h].orderDate.getMinutes();

                }
                let obj = {
                    data: req.body,
                    ordersID: orderID,
                    orderorderQuontity: orderorderQuontity,
                    orderFuelType: orderFuelType,
                    orderPatrolStationType: orderPatrolStationType,
                    orderDate: orderDate,
                    pageNumber: req.body.PageNumber
                };
                // console.log(orderDate);
                // console.log(obj.orders);
                result.render('clientCabinet' , obj)
                // console.log(orderList);
            }
            , req.body.email
            , req.body.PageNumber);
    }
    if (!req.body) return result.sendStatus(400);
    let ft ='';
    if (req.body.f95){ft = '95'}

    let psType ='';
    if (req.body.psWOG) {psType = 1} else { psType = 2}

    console.log('new order');
    console.log(req.body);
    // result.send('order accepted')
    if (req.body.orderQuantity && (req.body.psWOG || req.body.psOKKO ) ) {
        dbFunctions.makeNewOrder(function (res) {
                console.log(res);
            }
            , req.body.email
            , req.body.orderQuantity
            , ft
            , psType
        );
        let orderID = [] ;
        let orderorderQuontity =[];
        let orderFuelType = [];
        let orderPatrolStationType = [];
        let orderDate = [];
        dbFunctions.getClientOrders(function (ress) {
                for (let h = 0; h < ress[3].length; h++) {
                    // console.log(ress[h].orderID, ress[h].orderQuontity, ress[h].orderFuelType, ress[h].orderPatrolStationType, ress[h].orderDate);
                    orderID[h] = ress[3][h].orderID ;
                    orderorderQuontity[h] =ress[3][h].orderQuontity ;
                    orderFuelType[h] = ress[3][h].orderFuelType;
                    orderPatrolStationType[h] = ress[3][h].orderPatrolStationType;
                    orderDate[h] = ress[3][h].orderDate.getFullYear()+'-'+ress[3][h].orderDate.getMonth()+'-'+ ress[3][h].orderDate.getDate()+'  '+ress[3][h].orderDate.getHours()+':'+ress[3][h].orderDate.getMinutes();

                }
                let obj = {
                    data: req.body,
                    ordersID: orderID,
                    orderorderQuontity: orderorderQuontity,
                    orderFuelType: orderFuelType,
                    orderPatrolStationType: orderPatrolStationType,
                    orderDate: orderDate,
                    pageNumber: 0

                };
                // console.log(orderDate);
                // console.log(obj.orders);
                result.render('clientCabinet' , obj)
                // console.log(orderList);
            }
            , req.body.email
            , 0);
    }

});

app.post('/NewUser', urlencoderParser, function (req, result) {
    let obj ={};
    result.render('NewUser' , obj);
});

app.post('/CreateUser', urlencoderParser, function (req, result) {
    console.log(req.body);
    if (req.body.email || req.body.pass ) {
        dbFunctions.makeNewClient(function (res) {
                console.log(res);
                if (res === 0) { 
                    console.log('User with Login '+ req.body.email + ' already exists');
                }
                if (res !== 0) {
                    console.log('new CLIENT ' + req.body.email + ' was created');
                    // result.send('User with Login' + req.body.email + ' already exists');
                }
            }
            , req.body.clientName
            , req.body.email
            , req.body.pass
        );
        let obj = {};
        result.render('login', obj);
    }
});



app.get('/news', function (req, res) {
    var obj = { title: "newsTitle", id: 4, paragraphs: ['par-h', 'simple text', ]};
    console.log('id:' + req.params.id, 'dd: '+req.params.dd);
    res.render('news', {newsID: req.params.id, obj: obj})
});

app.listen(3000);
console.log('fuelMain.js');
console.log('server started, listening port 3000');


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
