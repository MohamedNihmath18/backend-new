// server.js (Express.js backend example)
const express = require("express");
const nodemailer = require("nodemailer"); // For sending emails
const cors = require("cors");

const app = express();
app.use(express.json()); // To parse JSON data
app.use(cors()); // Allow cross-origin requests if necessary

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohamednihmath13@gmail.com", // Replace with your email
    pass: "wizvstizxfvxbdbw", // Replace with your email password (or use OAuth)
  },
});

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Prepare email content
  const mailOptions = {
    from: email,
    to: "mohamednihmath13@gmail.com", // Where the form data should be sent
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
