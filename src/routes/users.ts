import Router from 'koa-router'

const router = new Router()

router.prefix('/users')

router.prefix('/v2')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

export default router
