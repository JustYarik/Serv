var nodemailer = require('nodemailer');
let mailCordentials = require('./query/mailoPtions');


exports.SendEmail = function (callback, to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: mailCordentials.fromEmail,
                pass: mailCordentials.password
              }
    });

    let mailOptions = {
        from: mailCordentials.fromEmail,
        to: to,
        subject: subject,
        text: text
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


};