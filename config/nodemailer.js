const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'elmira.sporer95@ethereal.email',
        pass: 'gjVyzJxUebkuh4DdFy'
    }
});

module.exports = transporter;