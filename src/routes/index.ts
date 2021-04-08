import Router from "koa-router";

const router = new Router();

router.prefix(`${process.env.BASE_API_PREFIX}`);

router.get(`/`, async (ctx, next) => {
  ctx.body = "Hello Koa 2!";
});

router.get(`/json`, async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

export default router;
