const Router = require('koa-router')
const router = new Router()
const control = require('../control/business-control')

router.get('/', control.index)

module.exports = router