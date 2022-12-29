const express = require('express');
const nodemailer = require('nodemailer');
const crd = require('./credn');

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/send', (req, res) => {
    // fetching data from form
    let email1 = req.query.email1;
    let email2 = req.query.email2;
    let subject = req.query.subject;
    let message = req.query.message;
    let emailFile = [email1,email2];

    const mail = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: "tariqhusainkhan01@gmail.com",
          pass: "psrzdiwwrisptylp"
      },
         tls:{
          ciphers:'SSLv3'
       }
    });

    mail.sendMail({
        from: "tariqhusainkhan01@gmail.com",
        //to: [email1, email2],
        to: [...emailFile],
        subject: subject,
        html: '<h1 >' + message + '</h1>'

    },
     function(error, result){
      if(error){
        console.log("Error: ", error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error",
        })
      }
      else{
        console.log("Success: ", result);
        res.send(`<h1>Email has been sent to ${emailFile} successfully. </h1>`);
      }
    mail.close();
  }

   );
});


app.listen(port, () => {
    console.log('Server is running at port %d ', port);
});