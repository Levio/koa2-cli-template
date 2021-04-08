import Router from "koa-router";

const router = new Router();

console.log(process.env.BASE_API_PREFIX);

router.prefix(`${process.env.BASE_API_PREFIX}/users`);

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

export default router;
