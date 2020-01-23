// if it's not in production connects to mongo db local
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
// view engine in this case we use ejs as our view engine
app.set("view engine", "ejs");
// we put all views in our views folder
app.set("views", __dirname + "/views");
//we wanna hock up rxpress layout and the idea is every singkle file
// will go inside of this file and we shouldn't duplicate strating html and
// ending html like footer,header and those htm are going to be inside of
/// layout file in layout folder
app.set("layout", "layouts/layout");
app.use(expressLayouts);
// files like style sheet java script images
app.use(express.static("public"));
// we need to have routes in order to show which page is going
// to show so that's why we create routes folder and we will put all
// our routes(controller) here we call controller routes in node js
//MVC model view controller, we have our view folder and controller is our routes and
// we need to make model folder for our database stuff

// mongo db connection set up and I created a .env file for environment variables files
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to mongoose"));
app.use("/", indexRouter);
// set our app to listen
app.listen(process.env.PORT || 3000);
