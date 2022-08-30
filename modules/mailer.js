const path= require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')



const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "cacc3022e9d666",
      pass: "f8daffaad95e5e"
    }
  });

  transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./recurso/')
    },
    viewPath: path.resolve('./recurso/'),
    extName: '.html',
  }));

  module.exports = transport