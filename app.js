const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const expressError = require('./utilities/expressError')

mongoose.connect(`mongodb://localhost:27017/yelp-camp`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, });
mongoose.connection.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once("open", () => { });

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ROUTER
const campgrounds = require("./routes/campgrounds");
const reviews = require('./routes/reviews')
app.use("/campgrounds", campgrounds);
app.use('/campgrounds/:id/reviews', reviews)

//ROUTES
app.get("/", (req, res) => {
	res.render("home");
});

app.all("*", (req, res, next) => {
	next(new expressError("Page not found", 401));
});
//ERROR ROUTE
app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Oh no, something went wrong";
	res.status(statusCode).render("error", { err });
});
//START SERVER
app.listen(3000, () => console.log("Server started on port 3000"));
