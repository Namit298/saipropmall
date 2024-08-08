const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 6000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins or configure it as needed

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'biztoindia5@gmail.com',
    pass: 'blhy anoh sfgt eokd', // This should be stored securely
  },
});

// Route to send email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'biztoindia5@gmail.com',
    to: 'info@saipropmall.com',
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.log('Error sending email: ', error);
    res.status(500).send('Error sending email');
  }
});

// New endpoint to send another type of email
app.post('/send-custom-email', async (req, res) => {
  const { to, subject, html } = req.body;

  const mailOptions = {
    from: 'biztoindia5@gmail.com',
    to: 'info@saipropmall.com',
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Custom email sent: ', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.log('Error sending custom email: ', error);
    res.status(500).send('Error sending custom email');
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log('Error in connecting ', err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});