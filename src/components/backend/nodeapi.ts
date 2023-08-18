import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = 21212;

const transporter = nodemailer.createTransport({
    host: `${process.env.REACT_APP_MAIL_APP_HOST}`,
    port: 587,
    secure: true,
    auth: {
        user: `${process.env.REACT_APP_MAIL_APP_USER}`,
        pass: `${process.env.REACT_APP_MAIL_APP_PASS}`,
    },
});
app.post('/api/send-email', (req, res) => {
    const { name, email, inquiry } = req.body;

    // Compose the email message
    const message = {
        from: `${process.env.REACT_APP_MAIL_APP_USER}`,
        to: `${process.env.REACT_APP_MAIL_APP_USER}`,
        subject: 'Website Contact Form: New Message',
        text: `
      Name: ${name}
      Email: ${email}
      Message: ${inquiry}
    `,
    };

    // Send the email using Nodemailer
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent successfully:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});