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
    console.log('MySQL Connected...');
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
        con.query(z1, (err, result) => { if (err) throw err;
            callback(returnData(result));

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
        })
    })
};