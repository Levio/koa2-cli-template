import Router from 'koa-router'

const router = new Router()

const baseUrl = 'api/v1'

router.get(`${baseUrl}/`, async (ctx, next) => {
  ctx.body = 'Hello Koa 2!'
})

router.get(`${baseUrl}/string`, async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get(`${baseUrl}/json`, async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

export default router
