
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "35.192.142.83",
    user: "root",
    password: "1111",
    database: "fuel"
});
// function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x);
//         }, 2000);
//     });
// }

// isSysyUserExists('suser1Login').then(z => console.log(z));

function setUserID(x) {
   var userExist = x;
   console.log('x: ' + x);
    
}
isSysyUserExists('suser1Login');

function isSysyUserExists( systemUserLogin) {

    con.connect(function (err) {
                    if (err) throw err;
                    console.log("Connected!");
                    // let systUserExist = -2;
                    
                    let isSysyUserExistsReq = "select 1 from sysUsers where sUserLogin='" + systemUserLogin + "'";

                    // console.log(isSysyUserExistsReq);


                    con.query( isSysyUserExistsReq, function (err, result) {
                                                            if (err) throw err;
                                                            // console.log(result);
                                                            // console.log(result.length);

                                                            if (result.length === 0){ setUserID(0); }
                                                            if (result.length > 0)  { setUserID(1)}
                                                        }
                            );

                }
             );
}

// console.log('z: '+ z);
// console.log('systUserExist: '+ systUserExist);
