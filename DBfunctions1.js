var mysql = require('mysql');
var fs = require('fs');
const process = require('process');
const Knex = require('knex');

var con = mysql.createConnection({
                                    host: "35.192.142.83",
                                    multipleStatements: true,
                                    user: "root",
                                    password: "1111",
                                    database: "fuel"

                                });

const knex = connect();
function connect () {
    console.log('Starting connect to mySQL DB');
    // [START connect]
    const config = {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE
    };

    if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
        config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
    }

    // Connect to the database
    const knex = Knex({
        client: 'mysql',
        connection: config
    });
    // [END connect]

    return knex;
}


// con.connect((err) => {
//     if (err) { throw err; }
//     console.log();
//     console.log('MySQL Connected...');
// });

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

