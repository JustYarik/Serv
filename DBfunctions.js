var mysql = require('mysql');
var fs = require('fs');


var con = mysql.createConnection({
                                    host: "35.192.142.83",
                                    multipleStatements: true,
                                    user: "root",
                                    password: "1111",
                                    database: "fuel",
                                    port: 3306
                                });


con.connect((err) => {
    if (err) { throw err; }
    console.log();
    console.log('F: DBfunctions --> MySQL Connected...');
});

function returnData(data){ return data; }

exports.getSysUserLogin = function (callback, suserLogin, userPassword) {
    getFileText('./query/getSysUserLogin.sql', (ft)=> {
        let z1 = ft.replace('___suserLogin', suserLogin).replace('___userPassword', userPassword);
        con.query(z1, (err, result) => { if (err) throw err;
            callback(returnData(result[2]));
        })
    });
};

exports.getClientLogin = function (callback, clientLogin, clientPassword) {
    getFileText('./query/getClientLogin.sql', (ft)=> {
        let z1 = ft.replace('___clientLogin', clientLogin).replace('___clientPassword', clientPassword);
        con.query(z1, (err, result) => { if (err) throw err;
            callback(returnData(result[2]));
        })
    });
};

exports.makeNewOrder = function (callback, clientEmail ,orderQuantity, orderFuelType, orderPStype) {
    getFileText('./query/makeNewOrder.sql', (ft)=> {
        let z1 = ft.replace('___clientLogin', clientEmail).replace('___orderQuantity', orderQuantity).replace('___orderFuelType', orderFuelType).replace('___orderPStype', orderPStype);
        con.query(z1, (err, result) => {
            if (err) throw err;
            if (result){
                getFileText('./query/getLastClientOrder.sql', (fft)=> {
                    let z2 = fft.replace('___clientLogin', clientEmail);
                    con.query(z2,(err2, res2)=>{
                        if (err2) throw err2;
                        console.log('F: DBfunctions --> ', res2[2][0] );

                        let orderData = {
                            systUserLogin: [ res2[2][0].sUserLogin.toUpperCase() ],
                            clientLogin: [clientEmail],
                            ordersID: [res2[1][0].orderID],
                            orderorderQuontity: [orderQuantity],
                            orderFuelType: [orderFuelType],
                            orderPatrolStationType: [ PSSelector(orderPStype)],
                            orderDate: [
                                            res2[1][0].orderDate.getFullYear()+'-'+res2[1][0].orderDate.getMonth()+'-'+ res2[1][0].orderDate.getDate()+'  '+res2[1][0].orderDate.getHours()+':'+res2[1][0].orderDate.getMinutes()
                                       ],
                            pageNumber: [0]

                        };

                        callback(returnData(orderData))
                    })
                });


            }
            else {
                callback(returnData(result));
            }


        })
    });
};

var getFileText = function (path, fileTextt ){
    fs.readFile(path, 'utf-8', function (err1, data) {
        fileTextt(data);
    });
};

exports.getClientOrders = function (callback, clientEmail, pageNumber ) {
    getFileText('./query/getClientOrdersPages.sql', (ft)=> {
        let z = ft.replace('___clientLogin', clientEmail).replace('___PN', pageNumber);
        con.query(z, (err, result) => { if (err) throw err;
            callback(returnData(result));
        })
    })
};

exports.makeNewClient = function (callback, clentName ,clientEmail, passHash) {
    getFileText('./query/makeNewClient.sql', (ft)=> {
        let z1 = ft.replace('___clientName', clentName).replace('___clientLogin', clientEmail).replace('___clientPasswordHash', passHash);
        con.query(z1, (err, result) => { if (err) throw err;
            callback(returnData(result[5][0].clientWasCreated));
        })
    });
};

exports.getClientName = function (ClientName, clientEmail ) {
    getFileText('./query/getClientName.sql', (ft)=> {
        let z1 = ft.replace('___clientLogin', clientEmail);
        con.query(z1, (err, result) => { if (err) throw err;
            ClientName(returnData(result[1][0].clientName));
        })
    });
};

exports.getClientOrdersForSystUser = function (callback, systUserLogin, pageNumber ) {
    getFileText('./query/getClientOrdersForSystUser.sql', (ft)=> {
        let z = ft.replace('___systUserLogin', systUserLogin).replace('___PN', pageNumber);
        con.query(z, (err, result) => { if (err) throw err;
            callback(returnData(result));
        });
        // console.log(z);
    })
};

exports.ordersDeleteBySystemUser = function (systUserLogin, orderID, ocbsuCB  ) {
    getFileText('./query/deleteOrderBySystemUser.sql', (ft)=> {
        let z = ft.replace('___systUserLogin', systUserLogin).replace('___orderID', orderID);
        con.query(z, (err, result) => { if (err) throw err;
            ocbsuCB(returnData(result));
        })
    })
};

exports.changeOrderStatus = function (systUserLogin, orderID, newOrderStatus, changeOrderStatusCB  ) {
    getFileText('./query/changeOrderStatus.sql', (ft)=> {
        let z = ft.replace('___systUserLogin', systUserLogin).replace('___orderID', orderID).replace('___newOrderStatus', newOrderStatus);
        con.query(z, (err, result) => { if (err) throw err;
            changeOrderStatusCB(returnData(result));
        })
        // console.log(z);
    })
};

exports.updateOrderBySUser = function (systUserLogin, orderID, newQantity, newFuelType, newPSTypeName, updateOrderBySUserCB  ) {
    getFileText('./query/updateOrderBySystUser.sql', (ft)=> {
        // console.log(ft);
        let z = ft.replace('___SULogin', systUserLogin).replace('___orderID', orderID).replace('___newQantity', newQantity).replace('___newFuelType', newFuelType).replace('___newPSTypeName', newPSTypeName);
        con.query(z, (err, result) => { if (err) throw err;
            updateOrderBySUserCB(returnData(result));
        });
        // console.log(z);
    })
};

exports.getSULoginForClientOrder = function (clientLogin, getSULoginForClientOrderCB  ) {
    getFileText('./query/getSULoginForClientOrder.sql', (ft)=> {
        // console.log(ft);
        let z = ft.replace('___clientLogin', clientLogin);
        con.query(z, (err, result) => { if (err) throw err;
            getSULoginForClientOrderCB(returnData(result[1]));
        });
        // console.log(z);
    })
};

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