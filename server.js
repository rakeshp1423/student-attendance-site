// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');

// Create an Express application
const app = express();
const port = 3000;

// Body parser middleware to parse JSON data
app.use(express.json());

// Create a Nodemailer transporter with your SMTP settings
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace 'Gmail' with your email service provider
    auth: {
        user: 'rakeshkumarpatra1423@gmail.com', // Your email address
        pass: '@Arakesh1423' // Your email password or application-specific password
    }
});

// Define a route to handle user signup and send verification email
app.post('/signup', (req, res) => {
    // Generate a random verification code (e.g., 6-digit code)
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Store the verification code along with the user's email address (you may store it in a database)
    const userData = {
        email: req.body.email,
        verificationCode: verificationCode
    };

    // Send a verification email
    transporter.sendMail({
        from: 'rakeshkumarpatra1423@gmail.com', // Sender email address
        to: req.body.email, // User's email address obtained from signup form
        subject: 'Verification Code', // Email subject
        text: `Your verification code is: ${verificationCode}` // Email body containing the verification code
    }, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Error sending verification email');
        } else {
            console.log('Verification email sent:', info.response);
            // Here, you may want to save userData in your database
            res.send('Verification email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
