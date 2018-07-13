var express = require('express');
var bodyParcer = require('body-parser');
// var ejs = require('ejs');
var dbFunctions = require('./DBfunctions');
var mail = require('./SendMail');

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
                // console.log(res);        // do not remove
                if (res.length !== 0) {
                    console.log('for CLIENT '+ req.body.email+ ' access ALLOWED');
                    clientCabinetRender(req.body.email, 0, (orderDate)=>{
                        result.render('clientCabinet' , orderDate)
                    });
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
        clientCabinetRender(req.body.email, req.body.PageNumber, (orderDate)=>{
            result.render('clientCabinet' , orderDate)
        });
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
        dbFunctions.makeNewOrder( (res)=> {
                // console.log(res);
                if (res){
                    dbFunctions.getClientName((ClientName)=>{
                        mail.SendEmail((callback)=>{
                                console.log('Mail was send');
                            }
                            , 'podobaYaroslav@gmail.com' // To
                            , 'new fuel order'
                            , 'dear ' + ClientName + ' you made a order for '+ req.body.orderQuantity + 'L of ' + fuelTypeSelector(req.body) + '('+getPSNameFromRequest(req.body)+')'
                        );

                        fuelTypeSelector(req.body)
                    }, req.body.email)
                }

                clientCabinetRender(req.body.email, 0, (orderDate)=>{
                    result.render('clientCabinet' , orderDate)
                });

                console.log( );
            }
            , req.body.email
            , req.body.orderQuantity
            , ft
            , psType
        );
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

function clientCabinetRender(clientEmail, pageNumber, OrderData) {
    dbFunctions.getClientName((ClientName)=>{
                                                // console.log(ClientName);
                                                dbFunctions.getClientOrders(function (ress) {
                                                                                                let orderID = [] ;
                                                                                                let orderorderQuontity =[];
                                                                                                let orderFuelType = [];
                                                                                                let orderPatrolStationType = [];
                                                                                                let orderDate = [];
                                                                                                for (let h = 0; h < ress[3].length; h++) {
                                                                                                // console.log(ress[h].orderID, ress[h].orderQuontity, ress[h].orderFuelType, ress[h].orderPatrolStationType, ress[h].orderDate);
                                                                                                orderID[h] = ress[3][h].orderID ;
                                                                                                orderorderQuontity[h] =ress[3][h].orderQuontity ;
                                                                                                orderFuelType[h] = ress[3][h].orderFuelType;
                                                                                                orderPatrolStationType[h] = PSSelector( ress[3][h].orderPatrolStationType);
                                                                                                orderDate[h] = ress[3][h].orderDate.getFullYear()+'-'+ress[3][h].orderDate.getMonth()+'-'+ ress[3][h].orderDate.getDate()+'  '+ress[3][h].orderDate.getHours()+':'+ress[3][h].orderDate.getMinutes();
                                                                                                }

                                                                                                let obj = {
                                                                                                clientEmail: clientEmail,
                                                                                                clientName: ClientName,
                                                                                                ordersID: orderID,
                                                                                                orderorderQuontity: orderorderQuontity,
                                                                                                orderFuelType: orderFuelType,
                                                                                                orderPatrolStationType: orderPatrolStationType,
                                                                                                orderDate: orderDate,
                                                                                                pageNumber: pageNumber
                                                                                                };

                                                                                                OrderData(obj);
                                                                                                }
                                                    , clientEmail
                                                    , pageNumber);
                                             }
                                                , clientEmail
    );
}

function PSSelector(psType) {
    let PSName ='';
    switch (psType) {
        case 1:
            PSName = 'WOG'; break;
        case 2:
            PSName = 'OKKO'; break;
    }
    return PSName;


}

function getPSNameFromRequest( request) {
    let PSName ='';
    if (request.psWOG){PSName = 'WOG'; return PSName}
    if (request.psOKKO) {PSName = 'OKKO'; return PSName}
}



function fuelTypeSelector(reqWithFuelType){
    let fuelName ='';
    console.log(reqWithFuelType);
    if (reqWithFuelType.f95) { fuelName = '95'; return fuelName}

}

// app.post('/about', urlencoderParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400);
//     console.log(req.body);
//     res.render('about-success', {data: req.body});
// });