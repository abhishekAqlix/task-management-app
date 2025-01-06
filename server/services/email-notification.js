const nodemailer = require("nodemailer");

function sendEmail(receiverDetails) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "deepika.tripathi@aqlix.com",
            pass: "lwoj yivb hejr vhk",
        },
    });

    transporter.sendMail(receiverDetails, (error, emailRes) => {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email Sent:", emailRes);
        }
    });
}

const receiver = {
    from: "deepika.tripathi@aqlix.com",
    to: "diptri6657@gmail.com",
    subject: "✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
};

// Call the function
sendEmail(receiver);




