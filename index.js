require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from current directory
app.use(express.static(__dirname));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Replace with your Gmail
        pass: process.env.EMAIL_PASS     // Replace with your app password
    }
});

// Route to handle email sending
app.post('/send-email', async (req, res) => {
    console.log('Received request:', req.body);
    try {
        const { email } = req.body;
        
        const mailOptions = {
            from: process.env.EMAIL_USER, // Replace with your Gmail
            to: email,
            subject: 'Welcome to Our Newsletter!',
            html: `
                <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thanks for Visiting</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; padding:30px; box-shadow:0 0 8px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="color:#333;">Thank You for Visiting!</h2>
            </td>
          </tr>
          <tr>
            <td style="color:#555; font-size:16px; line-height:1.6; text-align:center;">
              <p>Hi there,</p>
              <p>I appreciate you checking out my webpage. I hope you found it interesting and helpful.</p>
              <p>If you’d like ,revisit anytime!</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:30px 0;">
              <a href="http://localhost:3000" target="_blank" style="background-color:#28a745; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:5px; font-weight:bold;">Visit My Webpage Again</a>
            </td>
          </tr>
          <tr>
            <td style="font-size:13px; color:#999; text-align:center; padding-top:20px;">
              <p>Sent with ❤️ by Anushree Chavan</p>
              <p>© 2025 Anushree</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Add a basic GET route for testing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});