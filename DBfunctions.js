var mysql = require('mysql');

var con = mysql.createConnection({
    host: "35.192.142.83",
    user: "root",
    password: "1111",
    database: "fuel"
});


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

exports.getClientOrders = function (callback, clientEmail ) {
    let sqlreq =
 "   SELECT                                                 \n"+
 "         o.orderID                                        \n"+
 "       , o.orderQuontity                                  \n"+
 "       , o.orderFuelType                                  \n"+
 "       , o.orderPatrolStationType                         \n"+
 "       , o.orderDate                                      \n"+
 "   FROM orders AS o                                       \n"+
 "   WHERE orderClientID = (                                \n"+
 "       SELECT                                             \n"+
 "   clientID                                               \n"+
 "   FROM clients                                           \n"+
 "   WHERE upper(clientLogin) = upper('"+ clientEmail +"')  \n"+
 ")                                                         \n" +
 "ORDER BY orderID DESC;";
    // console.log(sqlreq);

    con.query(sqlreq, (err, result) => {
        // console.log('request string');
        // console.log(sqlreq);
        if (err) throw err;
        // console.log('result form DM');
        // console.log(result);
        callback(returnData(result));
    });
};
// exports.newone = function () { console.log('new one'); };

// getData(function (res) {
//     console.log();// EXPORT
// }, 'suser1login' );
