const nodemailer = require("nodemailer");

require('dotenv').config(); 


 async function sendEmail(receiverDetails) {

const transporter = nodemailer.createTransport({
    service : "gmail",
    secure :true,
    port:465 ,
    auth : {
        user :process.env.SENDER_EMAIL ,
       pass : process.env.SENDER_PASSWORD
    }
  });

    try {
        const emailRes = await transporter.sendMail(receiverDetails);
        console.log('Email sent:');
        //res.send('Email sent successfully!');
      } catch (error) {
        console.error('Error sending email:', error);
        //res.status(500).send('Failed to send email.');
      }

};

module.exports = {sendEmail};




