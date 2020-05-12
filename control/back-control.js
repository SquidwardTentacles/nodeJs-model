const backUserModel = require('../model/back-user_model')
module.exports = {
  login: async (ctx, next) => {
    let res = await backUserModel.lookupUser(ctx.request.body)
    if (res.length) {
      ctx.body = { code: '001', msg: '登录成功' }
      ctx.session.user = res[0]
    } else {
      ctx.body = { code: '002', msg: '账户不存在' }
    }
  },
  register: async (ctx, next) => {
    console.log(ctx.request.body, 'fff')
    let params = ctx.request.body
    if (!params || !params.account) {
      ctx.body = { code: '002', msg: '请填写用户名、密码' }
      return
    }
    let res = await backUserModel.lookupUser({ account: params.account })
    if (!res.length) {
      // 没有找到用户名 可以注册 
      let insertRes = await backUserModel.insertPeo(params)
      if (insertRes.affectedRows === 1) {
        ctx.body = { code: '001', msg: '注册成功' }
      } else {
        ctx.body = { code: '002', msg: '注册失败' }

      }

    } else {
      console.log('body')
      ctx.body = {
        code: 002, msg: '当前账户已存在'
      }
    }
  }
}