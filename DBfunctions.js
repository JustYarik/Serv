var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "35.192.142.83",
    multipleStatements: true,
    user: "root",
    password: "1111",
    database: "fuel"

});




// var outp = function (ft){
//     console.log(ft);
// };

// getFileText(1, outp);

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log();
    console.log('MySQL Connected...');


});

exports.getSysUserLogin = function (callback, suserLogin, userPassword) {
    // console.log('getData function');

    let sqlreq = "SELECT * FROM sysUsers WHERE upper(sUserLogin) = upper('" + suserLogin + "')" +
        " AND sUserPasswordHash ='" + userPassword + "'";
    con.query(sqlreq, (err, result) => {
        // console.log('request string');
        // console.log(sqlreq);
        if (err) throw err;
        // console.log('result form DM');
        // console.log(result);
        callback(returnData(result));
    });
};

function returnData(data){
    // console.log('returnData function');
    // console.log(data);
    return data;
}


exports.getClientLogin = function (callback, clientLogin, clientPassword) {
    // console.log('getData function');

    let sqlreq = "SELECT * FROM clients WHERE upper(clientLogin) = upper('" + clientLogin + "')" +
        " AND clientPasswordHash ='" + clientPassword + "'";

    con.query(sqlreq, (err, result) => {
        // console.log('request string');
        // console.log(sqlreq);
        if (err) throw err;
        // console.log('result form DM');
        // console.log(result);
        callback(returnData(result));
    });
};
exports.makeNerOrder = function (callback, clientEmail ,orderQuantity, orderFuelType, orderPStype) {
    // console.log('getData function');

    let sqlreq = " INSERT INTO orders (orderClientID, orderName, orderDate, orderQuontity, orderFuelType, orderPatrolStationType ) \n"+
    " SELECT                                                        \n"+
    " (                                                             \n"+
    "     SELECT clientID FROM clients                              \n"+
    "     WHERE upper(clientLogin) = upper('" + clientEmail + "')   \n"+
    "     LIMIT 1                                                   \n"+
    " )                                                             \n"+
    "    , 'newOrder'                                               \n"+
    "    , now()                                                    \n"+
    "    , " + orderQuantity.toString() + "                         \n"+
    "    , " + orderFuelType.toString() + "                         \n"+
    "    , " + orderPStype.toString() + "                           \n"+
    ";";
    // console.log(sqlreq);
    
    con.query(sqlreq, (err, result) => {
        // console.log('request string');
        // console.log(sqlreq);
        if (err) throw err;
        // console.log('result form DM');
        // console.log(result);
        // callback(returnData(result));
    });
};


var getFileText = function (path, fileTextt ){
    fs.readFile(path, 'utf-8', function (err1, data) {
        fileTextt(data);
    });
};

// var outp = function (ft, outRes){
//    console.log(ft);
//    con.query(ft, (err, res)=>{
//        if (err){ throw err}
//        outRes(returnData(res));
//    })
// };

// './query/etClientOrdersPages.sql'
// './query/1.txt',
exports.getClientOrders = function (callback, clientEmail, pageNumber ) {
    getFileText('./query/getClientOrdersPages.sql', (ft)=> {
        let z = ft.replace('___clientLogin', clientEmail).replace('___PN', pageNumber);
        console.log(z);
        con.query(z, (err, result) => {
                // console.log(ft);
            if (err) throw err;
            callback(returnData(result));
        })
    }
)
};
// exports.newone = function () { console.log('new one'); };

// getData(function (res) {
//     console.log();// EXPORT
// }, 'suser1login' );

function readTextFile(ccc) {
    let fileText = '';
    fs.readFile('./query/getClientOrdersPages1.sql', function (err, data) {
       fileText = data.toString().replace('___clientLogin','p_yarik@ukr.net');
    });
    ccc( fileText);
}
//
// console.log(readTextFile());
