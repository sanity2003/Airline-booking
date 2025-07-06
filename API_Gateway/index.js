const express = require('express')
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')

const axios =require('axios')

const rateLimit = require('express-rate-limit')
const app = express()

const PORT =3004

const limiter = rateLimit({
	windowMs: 6 * 60 * 1000, // 15 minutes
	limit: 5, 
	
})

app.use(limiter)
app.use(morgan('combined'))

// app.use('/bookingservice',async(req,res,next)=>{
//     console.log(req.headers['x-access-token'])
//     const response =await axios.get('http://localhost:3000/api/v1/isAuthenticated',{
//         headers:{
//             'x-accesstoken':req.headers['x-access-token']
//         }
//     })
//     console.log(response.data)
//     console.log('hi')
//     next()
// })

app.use('/bookingservice', async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        console.log('Gateway Token:', token);

        const response = await axios.get('http://localhost:3000/api/v1/isAuthenticated', {
            headers: {
                'x-access-token': token
            }
        });

        console.log('AuthService Response:', response.data);

        // Attach user ID to request if needed
        req.userId = response.data.data;

        if(response.data.success){
            next();
        }
         else {
            return res.status(401).json({
                message:'Unauthorized'
            })
        }
    } catch (error) {
        console.log('AuthService Axios Error:', error.response?.data || error.message);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            
        });
    }
});



app.use('/bookingservice',createProxyMiddleware({target:'http://localhost:3002/',changeOrigin:true}))

app.get('/home',(req,res)=>{
    return res.json({
        message:'OK'
    })
})



 app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
 })