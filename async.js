var mysql = require('mysql');
const add = require('DBfunctions');

var con = mysql.createConnection({
    host: "35.192.142.83",
    user: "root",
    password: "1111",
    database: "fuel"
});

// var suserLogin = 'suser1login';

function getData(callback, suserLogin) {
    console.log('getData function');
    con.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('MySQL Connected...');
    });

    let sqlreq = "SELECT * FROM sysUsers WHERE sUserLogin = '"+suserLogin+"'";
    con.query(sqlreq, (err, result) => {
        console.log('request string');
        console.log(sqlreq);
        if (err) throw err;
        // console.log('result form DM');
        // console.log(result);
        callback(returnData(result));
    });

}
function returnData(data){
    console.log('returnData function');
    // console.log(data);
    return data;
}

getData(function (res) {
   console.log();// EXPORT
}, 'suser1login' );
