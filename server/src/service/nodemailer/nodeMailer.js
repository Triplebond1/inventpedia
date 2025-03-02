import nodemailer from "nodemailer";

class NodeMailer {
  constructor(gmail, password, sendTo, subject, message) {
    this.gmail = gmail;
    this.password = password;
    this.sendTo = sendTo;
    this.subject = subject;
    this.message = message;

    // Basic validation for email fields
    if (!this.validateEmail(this.sendTo)) {
      throw new Error("Invalid recipient email format.");
    }

    if (!this.validateEmail(this.gmail)) {
      throw new Error("Invalid sender email format.");
    }

    if (!this.subject || !this.message) {
      throw new Error("Subject and message cannot be empty.");
    }

    // Create transporter within the constructor using environment variables
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.gmail,
        pass: this.password,
      },
    });
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Generate mail options based on the message type
  getMailOptions(isHtml = false) {
    return {
      from: process.env.USER_GMAIL,
      to: this.sendTo,
      subject: this.subject,
      [isHtml ? "html" : "text"]: this.message,
    };
  }

  // Send mail using async/await
  async sendMail(isHtml = false) {
    try {
      const info = await this.transporter.sendMail(this.getMailOptions(isHtml));
      console.log("Email sent:", info.response);
      return info.response;
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw error;
    }
  }
}

module.exports = NodeMailer;

// const nodemailer = require('nodemailer');

// class NodeMailer {

//     constructor(userGmail, userPassword, sendTo, subject, message,) {
//         this.userGmail = userGmail;
//         this.userPassword = userPassword;
//         this.sendTo = sendTo;
//         this.subject = subject;
//         this.message = message;
//      }

//     transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: this.userGmail,
//           pass: this.userPassword
//         }
//       });

//     textMailOptions = {
//         from: this.userGmail,
//         to: this.sendTo,
//         subject: this.subject,
//         text: this.message,
//     };

//     htmlMailOptions = {
//         from: this.userGmail,
//         to: this.sendTo,
//         subject: this.subject,
//         html: this.message,
//     };

//     sendMail = async (mailOptions) => {
//         transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//                 console.log(error);
//                 return error;
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 return ('Email sent: ' + info.response);
//             }
//           });
//       }
// }

// module.exports = NodeMailer;
