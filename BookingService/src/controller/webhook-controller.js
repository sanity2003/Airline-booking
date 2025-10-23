
const { WebhookClient } = require('actions-on-google'); // Using the library

// const { BookingService } = require('../services/index');
// const bookingService = new BookingService();

const handleWebhook = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    console.log('[Webhook] Received request from Dialogflow');

    async function checkBookingStatus(agent) {
        const bookingId = agent.parameters.bookingId; // Get bookingId extracted by Dialogflow
        console.log(`[Webhook] Checking status for booking ID: ${bookingId}`);

        if (!bookingId) {
            agent.add("I couldn't get the booking ID. Could you please provide it?");
            return;
        }

        try {
            
            // Fetch booking details from your database using the bookingId
            
            const booking = { id: bookingId, status: 'Confirmed', flightNumber: 'SK123' }; 

            if (booking) {
                agent.add(`Okay, I found your booking ${bookingId} for flight ${booking.flightNumber}. The current status is: ${booking.status}.`);
            } else {
                agent.add(`Sorry, I couldn't find a booking with the ID ${bookingId}. Please double-check the number.`);
            }
            

        } catch (error) {
            console.error("[Webhook] Error fetching booking status:", error);
            agent.add("Sorry, I encountered an error trying to check your booking status. Please try again later.");
        }
    }

    // Map intents to functions
    let intentMap = new Map();
    intentMap.set('Check Booking Status', checkBookingStatus); // Map the intent name to your function
    // intentMap.set('Another Intent Name', anotherFunction);

    agent.handleRequest(intentMap);
};

module.exports = {
    handleWebhook
};