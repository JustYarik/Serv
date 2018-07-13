var nodemailer = require('nodemailer');
var fs = require('fs');


var getFileText = function (path, fileTextt ){
    fs.readFile(path, 'utf-8', function (err1, data) {
        fileTextt(data);
    });
};

exports.getClientOrders = function (callback, clientEmail, pageNumber ) {

};

exports.SendEmail = function (callback, to, subject, text) {
    getFileText('./query/p.txt', (ft)=> {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                    user: '',
                    pass: ft
                  }
        });

        let mailOptions = {
            from: 'justyarik@gmail.com',
            to: to, //'podobaYaroslav@gmail.com',
            subject: subject, //'Sending Email using Node.js',
            text: text //'That was easy!'
        };

        // SEND Email

        transporter.sendMail(mailOptions, function (error, info) {

            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                callback(info.response);
            }
        });

    });
};
