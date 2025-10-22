const { NotificationTicket } = require('../models/index');
const { Op } = require("sequelize");

class TicketRepository {
    async getAll() { /* ... */ } 

    async create(data) {
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            console.error("Error in TicketRepository create:", error);
            throw error;
        }
    }

    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: { [Op.lte]: new Date() }
                }
            });
            return tickets;
        } catch (error) {
            console.error("Error in TicketRepository get:", error);
            throw error;
        }
    }

    async update(ticketId, data) {
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            if (!ticket) throw new Error(`Ticket with ID ${ticketId} not found.`);
            if (data.status) ticket.status = data.status;
            await ticket.save();
            return ticket;
        } catch (error) {
            console.error("Error in TicketRepository update:", error);
            throw error;
        }
    }
}
module.exports = TicketRepository;