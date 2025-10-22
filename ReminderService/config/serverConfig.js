const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    EMAIL_ID: process.env.EMAIL_ID,        
    EMAIL_PASS: process.env.EMAIL_PASS,    
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS, // 
    MAIL_HOST: process.env.MAIL_HOST,         // SMTP Host (Optional - for Mailgun/others)
    MAIL_PORT: process.env.MAIL_PORT,        

    // Message Queue (optional)
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY
};