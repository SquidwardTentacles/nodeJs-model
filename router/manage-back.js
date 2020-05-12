const Router = require('koa-router')
const router = new Router()
const backControl = require('../control/back-control')
router.post('/back/login', backControl.login)
  .post('/back/register', backControl.register)

module.exports = router