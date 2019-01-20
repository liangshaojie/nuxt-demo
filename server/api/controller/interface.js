import { Router } from 'express'

const myrouter = require('./router.js')

var router = Router()
// index router
router.get('/', myrouter.indexShow)
// 登录
router.post('/longin', myrouter.longin)

export default router