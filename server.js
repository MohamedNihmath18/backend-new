// server.js (Express.js backend example)
const express = require("express");
const nodemailer = require("nodemailer"); // For sending emails
const cors = require("cors");
require("dotenv").config(); 

const app = express();

// CORS configuration: Allow only requests from your frontend's domain
const corsOptions = {
  origin: 'https://mm-constructions.netlify.app', // Frontend URL on Netlify
  methods: 'GET, POST', // Allow necessary HTTP methods
  allowedHeaders: 'Content-Type', // Allow Content-Type header
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

app.use(express.json()); // To parse JSON data

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your email password (or use OAuth)
  },
});

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Prepare email content
  const mailOptions = {
    from: email,
    to: "mmconstructionss@gmail.com", // Where the form data should be sent
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message!" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
