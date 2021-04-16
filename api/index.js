const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = (req, res) => {
    createProxyMiddleware({
        target: 'https://www.google.com/',
        changeOrigin: true,
    })(req, res)
}
