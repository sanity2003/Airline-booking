const express = require('express')
 const router = express.Router()
 const { WebhookClient } = require('actions-on-google');
const {BookingController} =require('../../controller/index')
const webhookController = require('../../controller/webhook-controller');
router.post('/info',(req,res)=>{
    return res.json({
        message:'Response from routes'
    })
})
router.post('/bookings',BookingController.create)

router.get('/bookings', BookingController.getAll);
router.post('/webhook', webhookController.handleWebhook);
 module.exports =router