import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// tourist route import here..
import touristRouter from "./routes/tourist.route.js";

app.use("/api/v1/tourist",touristRouter);

// destination route import here...
import destinationRouter from "./routes/destination.route.js";

app.use("/api/v1/destination", destinationRouter);

// holidays routes comes here...

import holidayRouter from "./routes/holiday.route.js";

app.use("/api/v1/holiday", holidayRouter);

// flights routes will goes here....

import flightRouter from "./routes/flight.route.js";

app.use("/api/v1/flight", flightRouter);

// accomodation routes goes here....

import accomodationRouter from "./routes/accomodation.route.js";

app.use("/api/v1/accomodation", accomodationRouter);

// activities routes goes here...

import activitiesRouter from "./routes/activities.route.js";

app.use("/api/v1/activity", activitiesRouter);

// package routes goes here...

import packageRouter from "./routes/package.route.js";

app.use("/api/v1/package", packageRouter);

// transport routes goes here...

import transportRouter from "./routes/transport.route.js";

app.use("/api/v1/transport", transportRouter);

// reveiew routes goes here... and completed with apis...

import reveiwRouter from "./routes/reveiw.route.js";

app.use("/api/v1/reveiw", reveiwRouter);

// booking routes goes here....

import bookingRouter from "./routes/booking.route.js";

app.use("/api/v1/booking", bookingRouter);




export { app }