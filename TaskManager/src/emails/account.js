const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'aviel.el98@gmail.com',
        subject: 'Welcome to Aviel TaskManager',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'aviel.el98@gmail.com',
        subject: 'Goodbye from Aviel TaskManager',
        text: `Goodbye, ${name}. Let me know why you left the app.`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}