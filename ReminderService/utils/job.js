const cron = require('node-cron');
const emailService = require('../services/email-service');

const setupJobs = () => {
    cron.schedule('*/2 * * * *', async () => { // Runs every 2 minutes
        console.log("\n--- Cron Job: Checking for pending emails ---");
        try {
            const pendingEmails = await emailService.fetchPendingEmails();
            if (pendingEmails.length === 0) {
                console.log("Cron Job: No pending emails found.");
                return;
            }
            console.log(`Cron Job: Found ${pendingEmails.length} pending emails. Processing...`);

            await Promise.all(pendingEmails.map(async (ticket) => {
                try {
                    await emailService.sendBasicEmail(
                        ticket.subject,
                        ticket.content,
                        ticket.recepientEmail // 
                    );
                    await emailService.updateTicket(ticket.id, { status: "SUCCESS" });
                    console.log(`Cron Job: Successfully sent & updated ticket ID: ${ticket.id}`);
                } catch (sendError) {
                    console.error(`Cron Job: FAILED to send email for ticket ID: ${ticket.id}. Error:`, sendError.message);
                    await emailService.updateTicket(ticket.id, { status: "FAILED" });
                }
            }));
        } catch (error) {
            console.error("Cron Job: Error during execution:", error);
        } finally {
             console.log("--- Cron Job: Finished ---");
        }
    });
};
module.exports = setupJobs;