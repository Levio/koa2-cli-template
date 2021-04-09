import log4js from "log4js";

log4js.configure({
  appenders: {
    appFile: {
      type: "file",
      filename: "logs/main.log",
      maxLogSize: 10485760,
      backups: 10,
    },
    app: {
      type: "logLevelFilter",
      level: "INFO",
      appender: "appFile",
    },
    errorFile: {
      type: "file",
      filename: "logs/error.log",
      maxLogSize: 10485760,
      backups: 10,
    },
    errors: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorFile",
    },
    http: {
      type: "file",
      filename: "logs/http.log",
      maxLogSize: 10485760,
      backups: 10,
    },
    console: {
      type: "stdout",
    },
  },
  categories: {
    http: {
      appenders: ["app", "console"],
      level: "error",
    },
    default: {
      appenders: ["app", "errors", "console"],
      level: "debug",
    },
  },
});

export default (category?: string) => log4js.getLogger(category || "server");
