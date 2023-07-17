const axios = require("axios");
require("dotenv").config();

// POST reCAPTCHA verification token
const verifyHuman = async (req, res, next) => {
    const { recaptchaToken } = req.body;

    try {
        // Send secret key and response token to Google reCAPTCHA API for authentication
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        );

        // Check response status and send it back to the client-side
        if (response.data.success) {
            next(); // Move to the next middleware/route handler
        } else {
            return res.status(403).json({ error: "reCAPTCHA verification failed" });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = verifyHuman;