import { Nuxt } from 'nuxt'
import express from 'express'
var bodyParser = require('body-parser')

import api from './api'
const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3005

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', port)
//设置跨域
app.use(function(req, res, next) {
        // 设置那个源可以访问我，参数为 * 时，允许任何人访问，但是不可以和 cookie 凭证的响应头共同使用
        res.setHeader("Access-Control-Allow-Origin", ['http://localhost:3000']);
        // 想要获取 ajax 的头信息，需设置响应头
        res.setHeader("Access-Control-Allow-Headers", "Accept,Content-Type");
        // 处理复杂请求的头
        res.setHeader("Access-Control-Allow-Methods", "PUT");
        // 允许发送 cookie 凭证的响应头
        res.setHeader("Access-Control-Allow-Credentials", true);
        // 允许前端获取哪个头信息
        res.setHeader("Access-Control-Expose-Headers", "name");
        // 处理 OPTIONS 预检的存活时间，单位 s
        res.setHeader("Access-Control-Max-Age", 5);
        // 发送 PUT 请求会做一个试探性的请求 OPTIONS，其实是请求了两次，当接收的请求为 OPTIONS 时不做任何处理
        if (req.method === "OPTIONS") {
            res.end();
        }
    next();
});

app.use('/ceshi', function (req, res, next) {
    res.json({
        msg: '登录成功'
    })
    next();
})

// Import API Routes
app.use('/api', api)
// Start nuxt.js
async function start() {
    // Import and Set Nuxt.js options
    let config = require('../nuxt.config.js')
    config.dev = !(process.env.NODE_ENV === 'production')
    // Instanciate nuxt.js
    const nuxt = await new Nuxt(config)
    // Add nuxt.js middleware
    app.use(nuxt.render)
    // Build in development
    if (config.dev) {
        try {
            await nuxt.build()
        } catch (error) {
            console.error(error) // eslint-disable-line no-console
            process.exit(1)
        }
    }
    // Listen the server
    app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()



