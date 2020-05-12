const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const business = require('./router/business')
const backControl = require('./router/manage-back')
let { port, address } = require('../config.json')
const bodyParser = require('koa-bodyparser')
app.keys = ['test']
app.use(async (ctx, next) => {
  ctx.append("Access-Control-Allow-Origin", "http://192.168.1.3:8080")
  ctx.append("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE")
  ctx.append(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  )
  await next()
})

app.use(session({
  storage: '',
  get (key) {
    return this.storage[key]
  },
  set (key, value) {
    this.storage[key] = value
  },
  destroy (key) {
    delete this.destroy[key]
  }
}, app))
app.use(bodyParser())
app.use(business.routes())
app.use(backControl.routes())

app.listen(port, address, () => {
  console.log('running.....' + port)
})