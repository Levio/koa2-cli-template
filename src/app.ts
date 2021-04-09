import path from "path";
import Koa from "koa";
import json from "koa-json";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";
import cors from "kcors";
import { koaSwagger } from "koa2-swagger-ui";
import yamljs from "yamljs";

import index from "./routes/index";
import users from "./routes/users";

const app = new Koa();

// cors
app.use(cors({ origin: "*" }));

// 中间件
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  }),
);
app.use(json({}));
app.use(require("koa-static")(__dirname + "/static"));

// 请求日志
app.use(logger());
// app.use(async (ctx, next) => {
//   const start = new Date().getTime();
//   await next();
//   const ms = new Date().getTime() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// routes
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());

// swagger
const spec = yamljs.load(path.resolve(__dirname + "/swagger/swagger.yml"));
app.use(
  koaSwagger({
    routePrefix: "/swagger",
    swaggerOptions: {
      spec,
    },
  }),
);

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

export default app;
