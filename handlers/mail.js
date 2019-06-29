const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/mail');

let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.password
    }
});

const htmlGenerator = (file, options = {}) => {
    var html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, options);
    return juice(html)
};

exports.toSendMail = async (options) => {
    const html = htmlGenerator(options.file, options);
    const text = htmlToText.fromString(html);

    let optionsEmail = await transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text,
        html
    });

    const sendEmail = util.promisify(transporter.sendMail, transporter);
    return sendEmail.call(transporter, optionsEmail);
};







