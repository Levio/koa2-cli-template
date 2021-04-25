import path from "path";
import Koa from "koa";
import koaBody from "koa-body";
import koaLogger from "koa-logger";
import logger from "./logs/logger";
import cors from "kcors";
import { koaSwagger } from "koa2-swagger-ui";
import yamljs from "yamljs";

import index from "./routes/index";
import users from "./routes/users";
import { checkDirExist, getUploadFileExt } from "./utils";

const app = new Koa();

// cors
app.use(cors({ origin: "*" }));

const upload_path = path.join(__dirname, `../public/upload/`);

// 中间件
app.use(
  koaBody({
    multipart: true,
    // encoding: "gzip",
    formidable: {
      uploadDir: upload_path,
      keepExtensions: true,
      maxFieldsSize: 2 * 1024 * 1024,
      onFileBegin: (name, file) => {
        const dir = upload_path;
        checkDirExist(dir);
        const ext = getUploadFileExt(file.path);
        file.path = `${dir}/${name}.${ext}`;
      },
    },
  }),
);
app.use(require("koa-static")(__dirname + "/static"));

// 请求日志
app.use(koaLogger());
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
  logger().error("server error", err, ctx);
});

export default app;
