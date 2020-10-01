const { urlencoded } = require("express");
const express = require("express");

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

// setup error handler
const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if (process.env.NODE_ENV === "development") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
