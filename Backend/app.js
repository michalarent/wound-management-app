const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const songsRouter = require("./routes/songs-route");
const usersRouter = require("./routes/users-route");
const woundsRouter = require("./routes/wounds-route");
const HttpError = require("./models/http-error");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
// app.use("/api/songs", songsRouter);
app.use("/api/users", usersRouter);
app.use("/api/wounds", woundsRouter);

app.use((req, res, next) => {
  const error = new HttpError("Couldnt find this route!");
  throw error;
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unkown error occured!",
  });
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@wrapitapp.1jgx2.mongodb.net/WrapItApp?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Server listening");
    
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
