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

exports.getUser = function (callback, suserLogin, userPassword) {
    // console.log('getData function');

    let sqlreq = "SELECT * FROM sysUsers WHERE upper(sUserLogin) = upper('"+suserLogin+"')" +
        " AND sUserPasswordHash ='"+userPassword+"'";
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


exports.newone = function () { console.log('new one'); };

// getData(function (res) {
//     console.log();// EXPORT
// }, 'suser1login' );
