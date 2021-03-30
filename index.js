const Koa = require('koa')
const proxy = require('koa-proxy')
const convert = require('koa-convert')
const app = new Koa()
const zlib = require('zlib')

app.use(
    convert(function* (next) {
        yield next
        if (this.path === '/' || this.path === '/search') {
            const data = yield zlib.gunzip.bind(zlib, this.body)
            const str = data.toString('utf-8').replace(
                /<body([^>]*)>/,
                `<body$1>
  <div style="font-size: 14px; text-align: center; padding: 3px 10px;">Powered By <a href="https://www.lets-ss.com">lets-ss.com</a></div>
`
            )
            this.body = yield zlib.gzip.bind(zlib, str)
        }
    })
)

app.use(
    convert(
        proxy({
            host: 'https://www.google.com', // 目标站 点
            jar: true, // 转发 cookie
            followRedirect: false, // co-request 的参数，不跟随跳转
        })
    )
)
app.listen(80)

// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5001

// var proxy   = require('express-http-proxy')

// express()
//   .use(express.static(path.join(__dirname, 'dist')))
// //   .set('dist', path.join(__dirname, 'dist'))
// //   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('dist/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
