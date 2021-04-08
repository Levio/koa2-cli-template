import Koa from "koa";
const app = new Koa();
import json from "koa-json";
// import onerror from 'koa-onerror'
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";
import cors from "kcors";

import index from "./routes/index";
import users from "./routes/users";

// onerror(app)
// cors
app.use(cors({ origin: "*" }));

// 中间件
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  }),
);
app.use(json({}));
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

// 请求日志
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes());
app.use(index.allowedMethods());
app.use(users.routes());
app.use(users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

export default app;
