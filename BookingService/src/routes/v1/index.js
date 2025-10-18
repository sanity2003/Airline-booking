const express = require('express')
 const router = express.Router()
const {BookingController} =require('../../controller/index')
router.post('/info',(req,res)=>{
    return res.json({
        message:'Response from routes'
    })
})
router.post('/bookings',BookingController.create)

router.get('/bookings', BookingController.getAll);

 module.exports =router