var express = require('express');
var bodyParcer = require('body-parser');
// var ejs = require('ejs');
var dbFunctions = require('./DBfunctions');
var mail = require('./SendMail');
var sucupdate = require('./updSUCabinet');
// var sssoket  = require('./public/orderListSU');


var app = express();

var urlencoderParser = bodyParcer.urlencoded({extended: false});
server = app.listen(3000);
const io = require("socket.io")(server);

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
///////////////////////////////////////////////////////////////////////
var sessions = [
                    //   [ '1@com',  'SID_1']
                    // , [ '2@com', 'SID_2']
               ];






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
                console.log('F: fuelMain2 --> for SYSTEM user '+ req.body.email+ ' access ALLOWED');
                systUserCabinetRender(req.body.email, 1, (systUserOrderDate)=>{
                    result.render('sysUserCabinet' , systUserOrderDate);

                    setTimeout(()=>{
                        sucupdate.updateCabinet(systUserOrderDate);
                        console.log('F: fuelMain2 --> system user cabinet was updated ');
                    }, 1000);
                });
            }
            else {
                result.send('Login or password are wrong');
                console.log('F: fuelMain2 --> for SYSTEM user '+ req.body.email+ ' access DENIED');
            }
        }
        , req.body.email
        , req.body.pass );
    }

    if (req.body.email && !req.body.sysUserCheck)  {
        dbFunctions.getClientLogin(function (res) {
                // console.log(res);        // do not remove
                if (res.length !== 0) {
                    console.log('F: fuelMain2 --> for CLIENT '+ req.body.email+ ' access ALLOWED');
                    clientCabinetRender(req.body.email, 0, (orderDate)=>{
                        result.render('clientCabinet' , orderDate)
                    });
                }
                else {
                    result.send('Login or password are wrong');
                    console.log('F: fuelMain2 --> for CLIENT '+ req.body.email+ ' access DENIED');
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

    console.log('F: fuelMain2 --> new order');
    console.log( req.body);
    // result.send('order accepted')
    if (req.body.orderQuantity && (req.body.psWOG || req.body.psOKKO ) ) {
        dbFunctions.makeNewOrder( (res)=> {
                // console.log(res);
                if (res){
                    sucupdate.updateCabinet(res);

                    // sending a mail
                    /*
                    dbFunctions.getClientName((ClientName)=>{

                        mail.SendEmail((callback)=>{
                                console.log('F: fuelMain2 --> Mail was send');
                            }
                            , 'podobaYaroslav@gmail.com' // To
                            , 'new fuel order'
                            , 'dear ' + ClientName + ' you made an order for '+ req.body.orderQuantity + 'L of ' + fuelTypeSelector(req.body) + '('+getPSNameFromRequest(req.body)+')'
                        );

                        fuelTypeSelector(req.body)
                    }, req.body.email)
                    */
                }

                clientCabinetRender(req.body.email, 0, (orderDate)=>{
                    result.render('clientCabinet' , orderDate)
                });

            }
            , req.body.email
            , req.body.orderQuantity
            , ft
            , psType
        );
    }
});

app.post('/NewUser', urlencoderParser, function (req, result) {
    let obj ={
        userExistMesage: ' '
    };
    result.render('NewUser' , obj);
});

app.post('/CreateUser', urlencoderParser, function (req, result) {
    console.log(req.body);
    if (req.body.email || req.body.pass ) {
        dbFunctions.makeNewClient(function (res) {
                // console.log(res);
                if (res === 0) { 
                    console.log('F: fuelMain2 --> User with Login '+ req.body.email + ' already exists');
                    let objFail = {
                        userExistMesage: 'user with such login '+ req.body.email + ' already exists'
                    };
                    result.render('NewUser', objFail);

                }
                if (res !== 0) {
                    console.log('F: fuelMain2 --> new CLIENT ' + req.body.email + ' was created');
                    // result.send('User with Login' + req.body.email + ' already exists');
                    let objFine = {
                        userExistMesage: 'user created'
                    };
                    result.render('login', objFine);
                }
            }
            , req.body.clientName
            , req.body.email
            , req.body.pass
        );

    }
});


console.log('F: fuelMain2 --> fuelMain2.js');
console.log('F: fuelMain2 --> server started, listening port 3000');

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
                                                                                                // refreshSUCabinet(obj);
                                                                                                OrderData(obj);
                                                                                             }
                                                    , clientEmail
                                                    , pageNumber);
                                             }
                                , clientEmail
    );
}

function systUserCabinetRender(systUserLogin, pageNumber, systUserOrderDate) {
    dbFunctions.getClientOrdersForSystUser((ress)=>{
            let clientLogin =[];
            let orderID = [] ;
            let orderorderQuontity =[];
            let orderFuelType = [];
            let orderPatrolStationType = [];
            let orderDate = [];
            let orderStatusID = [];
            for (let h = 0; h < ress[1].length; h++) {
                // console.log(ress[h].orderID, ress[h].orderQuontity, ress[h].orderFuelType, ress[h].orderPatrolStationType, ress[h].orderDate);
                clientLogin[h]= ress[1][h].clientLogin;
                orderID[h] = ress[1][h].orderID ;
                orderorderQuontity[h] =ress[1][h].orderQuontity ;
                orderFuelType[h] = ress[1][h].orderFuelType;
                orderPatrolStationType[h] = PSSelector( ress[1][h].orderPatrolStationType);
                orderDate[h] = ress[1][h].orderDate.getFullYear()+'-'+ress[1][h].orderDate.getMonth()+'-'+ ress[1][h].orderDate.getDate()+'  '+ress[1][h].orderDate.getHours()+':'+ress[1][h].orderDate.getMinutes();
                orderStatusID[h] = ress[1][h].orderStatusID;
            }

            let obj = {
                systUserLogin: systUserLogin,
                // clientEmail: systUserLogin,
                // clientName: 'SystemUser',
                clientLogin: clientLogin,
                ordersID: orderID,
                orderorderQuontity: orderorderQuontity,
                orderFuelType: orderFuelType,
                orderPatrolStationType: orderPatrolStationType,
                orderDate: orderDate,
                orderStatusID: orderStatusID,
                pageNumber: pageNumber
            };

            // refreshSUCabinet(obj);
            systUserOrderDate(obj);
            // systUserOrderDate(ress[1]);
        // console.log(ress[1]);
        // systUserOrderDate('OK');
    }
    , systUserLogin
    , pageNumber)

}

// function refreshSUCabinet( obj) {
//     console.log('refreshSUCabinet');
io.on('connection', (socket)=> {


    // list of sockets
    io.clients((error, clients) => {
        if (error) throw error;
        // console.log(clients);
    });


    // io.to('uyWY0zAjECpANNL3AAAA').emit('new_message', {message: 'hello'});

    console.log('F: fuelMain2 --> new user connected, socket.id: ' + socket.id);

    // listen a new_nessage
    socket.on('new_message', (data)=>{
        // bordercast the new message
        // io.sockets.emit('new_message', data );
        // console.log(data.message.systUserLogin);
        findSocketIDbySULogin((data.message.systUserLogin+'').toUpperCase(), (cb)=>{
            console.log( 'L278 socketIDofLoockedSuser: ', cb);
            console.log(sessions);
            for (let y = 0; y < cb.length; y++){
                console.log('line 281');
                // console.log('line 282',  );
                io.to(sessions[cb[y]][1]).emit('new_message', data);
            }
        });
        console.log('F: fuelMain2 L285 --> new message ');
    });
    
    socket.on('disconnect', ()=>{

        // delFromSessions();
        console.log('F: fuelMain2 --> Cabinet disconnected, socket.id: ' + socket.id);
        deleteSessions(socket.id, (CB_sessions)=>{
            console.log(CB_sessions);
        })
    });

    socket.on('susername', (data1)=>{
        addSession(data1.username, socket.id );
        // console.log('USERNAME');
        // console.log(sessions);
    });
    
    
    socket.on('orderCancelBySystemUser', (orderID)=>{
        // find suser Login in sessions
            let suserLogin = '';
            for(let  i = sessions.length - 1; i >= 0; i--) {
            if(sessions[i][1] === socket.id) {
                suserLogin = sessions[i][0];
                dbFunctions.ordersDeleteBySystemUser(suserLogin, orderID.orderID, (cb)=>{
                    console.log('order ' + orderID.orderID + ' was deleted');
                } )
            }
        }
        console.log(orderID.orderID, socket.id);
            systUserCabinetRender(suserLogin, 1, (systUserOrderDate)=>{
                    sucupdate.updateCabinet(systUserOrderDate);
                    console.log('F: fuelMain2 --> system user cabinet was updated ');
                }
            );
        }
    //
    );

    // socket.on('orderDelivered', (orderID)=>{
    //         // find suser Login in sessions
    //         let suserLogin = '';
    //         for(let  u = sessions.length - 1; u >= 0; u--) {
    //             if(sessions[u][1] === socket.id) {
    //                 suserLogin = sessions[u][0];
    //                 dbFunctions.changeOrderStatus(suserLogin, orderID.orderID, 10, (cb)=>{
    //                     console.log('status of order ' + orderID.orderID + ' was updated up to DELIVERED');
    //                 } )
    //             }
    //         }
    //         console.log(orderID.orderID, socket.id);
    //         systUserCabinetRender(suserLogin, 1, (systUserOrderDate)=>{
    //                 sucupdate.updateCabinet(systUserOrderDate);
    //                 console.log('F: fuelMain2 --> system user cabinet was updated ');
    //             }
    //         );
    //
    //     }
        //
    // )

});

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
    // console.log(reqWithFuelType);
    if (reqWithFuelType.f95) { fuelName = '95'; return fuelName}

}

function addSession(suserLogin, socketID, addSessionCB ){
    sessions.push([suserLogin, socketID ] );
    // addSessionCB(sessions);
    console.log(sessions);
}
function deleteSessions(socketID, CB_session) {
    for(let  i = sessions.length - 1; i >= 0; i--) {
        if(sessions[i][1] === socketID) {
            sessions.splice(i, 1);
        }
        CB_session(sessions);
    }
}


function findSocketIDbySULogin(susername, CB){
    let socketIDofLoockedSuser = [];
    // console.log('L393 susername', susername);
    console.log('sessions: ', sessions);

    console.log('F: fuelMain2 --> L344 sessions.Length:  ' + sessions.length);
    for (let t = 0; t < sessions.length; t++) {
        // console.log('L341 '+sessions[t][0].toUpperCase() );
        // console.log('L342 '+susername);
       if (sessions[t][0].toUpperCase() ===  susername){
                socketIDofLoockedSuser.push(t);
                // console.log('L402: match find', socketIDofLoockedSuser);
            }
    }
    CB(socketIDofLoockedSuser);

}

// function orderCancelBySystemUser(suserLogin, orderID){
//
// }

app.get('/news', function (req, res) {
    var obj = { title: "newsTitle", id: 4, paragraphs: ['par-h', 'simple text', ]};
    console.log('id:' + req.params.id, 'dd: '+req.params.dd);
    res.render('news', {newsID: req.params.id, obj: obj})
});

// app.get('/order', urlencoderParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400);
//     console.log(req.body);
//     res.render('about', {data: req.body});
// });

// app.post('/about', urlencoderParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400);
//     console.log(req.body);
//     res.render('about-success', {data: req.body});
// });