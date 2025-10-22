const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');
const { MAIL_FROM_ADDRESS } = require('../config/serverConfig'); // Get configured 'From' address

const repo = new TicketRepository();

const sendBasicEmail = async (mailSubject, mailBody, mailTo) => {

    try {
        console.log(`Attempting send: To=${mailTo}, Subject=${mailSubject}`);
        const response = await sender.sendMail({
            from: MAIL_FROM_ADDRESS, // Use configured 'From' address
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
        console.log("Nodemailer Success:", response.messageId || 'Sent OK');
        
        if (response.messageId && response.messageId.includes('ethereal.email')) {
             console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));
        }
        return response;
    } catch (error) {
        console.error("Error in sendBasicEmail:", error);
        throw error;
    }
};

const fetchPendingEmails = async () => {
    try {
        const response = await repo.get({ status: "PENDING" });
        return response;
    } catch (error) {
        console.error("Error in fetchPendingEmails:", error);
        throw error;
    }
};

const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.error("Error in updateTicket:", error);
        throw error;
    }
};

const createNotification = async (data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.error("Error in createNotification:", error);
        throw error;
    }
};


// const subscribeEvents = async (payload) => { /* ... Keep if using ... */ };

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents 
};