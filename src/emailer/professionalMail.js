const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')

const createTransport = () => {
    /* var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ee1ca0a042c33f",
          pass: "11f34a16c5cace"
        }
      }); */
      var transport = nodemailer.createTransport(
        nodemailerSendgrid({
          apiKey: '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'
        })
      )
      return transport
}

const sendProfessionalMail = async (user) => {
    const transporter = createTransport()
    const info = await transporter.sendMail({
        from: '"Vinculando Admin 👻" <iggymartin@hotmail.com>', // sender address
        to: "iggymartin02102000@gmail.com", // list of receivers
        subject: `${user.fullName} te contrataron!`, // Subject line
        html: "<b>Te han contratado. A trabajar!</b>", // html body
    })
    console.log("Message sent: %s", info.messageId);
    return
}

exports.sendProfessionalMail = (user) => sendProfessionalMail(user)