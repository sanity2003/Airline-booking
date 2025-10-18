

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3004;

app.use(cors());
app.use(morgan('combined'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);


// --- PROXY RULES FOR EACH SERVICE ---

// Common options for all proxies
const commonOptions = {
  changeOrigin: true,
  timeout: 60000,
  proxyTimeout: 60000,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Gateway] Original Path: ${req.url} -> Forwarding to: ${proxyReq.host}${proxyReq.path}`);
  }
};

// Auth Service Proxy
app.use(
  '/authservice',
  createProxyMiddleware({
    ...commonOptions,
    //  The target now includes the '/api' prefix
    target: 'http://localhost:3000/api', 
    //  We now just strip '/authservice' completely
    pathRewrite: {
      '^/authservice': '', 
    },
  })
);

//  Flight & Search Service Proxy
app.use(
  '/flightservice',
  createProxyMiddleware({
    ...commonOptions,
    target: 'http://localhost:3001/api', // Target includes '/api'
    pathRewrite: {
      '^/flightservice': '', // Strip the prefix
    },
  })
);

//  Booking Service Proxy
app.use(
  '/bookingservice',
  createProxyMiddleware({
    ...commonOptions,
    target: 'http://localhost:3002/api', // Target includes '/api'
    pathRewrite: {
      '^/bookingservice': '', // Strip the prefix
    },
  })
);


app.get('/home', (req, res) => {
  res.json({ message: 'API Gateway is alive and kicking!' });
});

app.listen(PORT, () => {
  console.log(` API Gateway started on http://localhost:${PORT}`);
});