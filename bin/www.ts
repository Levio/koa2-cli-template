#!/usr/bin/env node

// 加载env文件配置
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "../src/app";
import logger from "../src/logs/logger";
import {createConnection} from 'typeorm';
import 'reflect-metadata';

const port = normalizePort(process.env.PORT || "3000");

createConnection().then(() => {

  const server = http.createServer(app.callback());

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
  
  function onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
      case "EACCES":
        logger().error(bind + " requires elevated privileges");
        process.exit(1);
      case "EADDRINUSE":
        logger().error(bind + " is already in use");
        process.exit(1);
      default:
        throw error;
    }
  }
  
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    logger().debug("Listening on " + bind);
    logger().debug(`Server is listening http://localhost:${port}`);
  }

}).catch(error => {
  logger().error("TypeORM connection error:", error);
})


function normalizePort(val: any) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

