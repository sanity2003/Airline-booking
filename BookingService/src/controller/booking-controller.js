const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services/index'); 


const axios = require('axios');
const jwt = require('jsonwebtoken');
const { JWT_KEY ,FLIGHT_SERVICE_PATH} = require('../config/serverConfig'); 


const REMINDER_SERVICE_API = 'http://localhost:3005/api/v1/tickets';


const bookingService = new BookingService();


const create = async (req, res) => {
    try {
        //  Get User Info from JWT ---
        const token = req.headers['x-access-token'];
        if (!token) { /* ... handle no token ... */ }
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_KEY);
        } catch (jwtError) { /* ... handle invalid token ... */ }
        const userEmail = decoded.email;
        const userId = decoded.id;
        

        const bookingData = { ...req.body, userId: userId };
        console.log(`[BookingController] Attempting booking for user ${userId}, data:`, bookingData);

        
        const bookingResponse = await bookingService.createBooking(bookingData);
        console.log("[BookingController] Booking creation successful:", bookingResponse);
        

        
        let flightNumber = 'N/A'; // Default flight number
        const flightId = bookingResponse.flightId; // Get flightId from the booking response

        if (flightId && FLIGHT_SERVICE_PATH) {
            try {
                
                const flightServiceUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
                console.log(`[BookingController] Fetching flight details from: ${flightServiceUrl}`);

                // Make the GET request to FlightService (include token if needed by FlightService)
                const flightResponse = await axios.get(flightServiceUrl, {
                    headers: { 'x-access-token': token } // Forward token if FlightService requires auth
                });

                if (flightResponse.data && flightResponse.data.success) {
                    flightNumber = flightResponse.data.data.flightNumber; // Extract flightNumber
                    console.log(`[BookingController] Fetched flight number: ${flightNumber}`);
                } else {
                    console.warn(`[BookingController] Could not fetch flight details from FlightService. Response:`, flightResponse.data);
                }
            } catch (flightError) {
                console.error(`[BookingController] Error fetching flight details for ID ${flightId}:`, flightError.response ? flightError.response.data : flightError.message);
                // Continue without the flight number, using the default 'N/A'
            }
        } else {
            console.warn(`[BookingController] Cannot fetch flight details: flightId or FLIGHT_SERVICE_PATH missing.`);
        }
        


        //  Trigger Notification (Call ReminderService) ---
        if (userEmail) {
            const bookingId = bookingResponse.id;
            const notificationPayload = {
                subject: `✈️ SkyBook Booking Confirmed! (ID: ${bookingId})`,
                content: `Dear User,\n\nYour booking for flight ${flightNumber} is confirmed.\nBooking ID: ${bookingId}\nFlight ID: ${flightId}\n\nThank you for flying with SkyBook!`,
                recepientEmail: userEmail,
                notificationTime: new Date()
            };

            console.log(`[BookingController] Sending notification request for user ${userEmail}`);
            axios.post(REMINDER_SERVICE_API, notificationPayload)
                .then(remResponse => console.log(`[BookingController] Notification ticket created.`))
                .catch(remError => console.error('[BookingController] Failed to create notification ticket:', remError.response ? remError.response.data : remError.message));
        } else { /* ... handle missing email ... */ }
        
        return res.status(StatusCodes.CREATED).json({ 
            message: 'Successfully created booking',
            success: true,
            data: bookingResponse,
            err: {}
        });
        

    } catch (error) {
        console.error("[BookingController] Error in create function:", error);
        
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
            message: error.message || 'Booking creation failed.',
            success: false,
            data: {},
            
            err: error.explanation || error.message || 'An internal error occurred'
        });
    }
};

const getAll = async (req, res) => {
    try {
        const response = await bookingService.getAllBookings(); 
        return res.status(StatusCodes.OK).json({
            message: 'Successfully fetched all bookings',
            success: true, data: response, err: {}
        });
    } catch (error) {
        console.error("[BookingController] Error in getAll function:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to fetch bookings',
            success: false, data: {}, err: error.message
        });
    }
};

module.exports = {
    create,
    getAll
};