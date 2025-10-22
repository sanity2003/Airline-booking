const TicketService = require('../services/email-service');

const create = async (req, res) => {
    try {
        const { subject, content, recepientEmail, notificationTime } = req.body;
        if (!subject || !content || !recepientEmail || !notificationTime) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: subject, content, recepientEmail, notificationTime',
                data: {}, err: 'Bad Request'
            });
        }
        const response = await TicketService.createNotification(req.body);
        return res.status(201).json({
            success: true, data: response, err: {},
            message: 'Successfully registered an email reminder'
        });
    } catch (error) {
        console.error("Error in ticket controller create:", error);
        return res.status(500).json({
            success: false, data: {},
            err: error.message || 'Internal Server Error',
            message: 'Unable to register an email reminder'
        });
    }
}
module.exports = { create };