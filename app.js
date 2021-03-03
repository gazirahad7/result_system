const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routers/routes");
const editRouter = require("./routers/editAndDelRoutes");
require("dotenv").config();
const app = express();

/*==============================================================*/
/************************ Set & Use  *************************/
/*==============================================================*/
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/*============================= Use Routers =============================*/
app.use(router);
app.use(editRouter);
/*==============================================================*/
/***************************  Server   *************************/
/*==============================================================*/
app.listen(process.env.PORT, () => {
  console.log(`Server Running ${process.env.PORT}`);
});
