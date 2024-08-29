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
import touristRouter from "./routes/user/tourist.routes.js";

app.use("/api/v1/tourist",touristRouter);

// destination route import here...
import destinationRouter from "./routes/user/destination.routes.js";

app.use("/api/v1/destination", destinationRouter);

// holidays routes comes here...

import holidayRouter from "./routes/user/holiday.routes.js";

app.use("/api/v1/holiday", holidayRouter);

// flights routes will goes here....

import flightRouter from "./flights/flight.routes.js";

app.use("/api/v1/flight", flightRouter);

// accomodation routes goes here....

import accomodationRouter from "./routes/user/accomodation.routes.js";

app.use("/api/v1/accomodation", accomodationRouter);

// activities routes goes here...

import activitiesRouter from "./routes/user/activities.routes.js";

app.use("/api/v1/activity", activitiesRouter);

// package routes goes here...

import packageRouter from "./routes/user/package.routes.js";

app.use("/api/v1/package", packageRouter);

// transport routes goes here...

import transportRouter from "./routes/user/transport.routes.js";

app.use("/api/v1/transport", transportRouter);

// reveiew routes goes here... and completed with apis...

import reveiwRouter from "./routes/user/reveiw.routes.js";

app.use("/api/v1/reveiw", reveiwRouter);

// booking routes goes here....

import bookingRouter from "./routes/user/booking.routes.js";

app.use("/api/v1/booking", bookingRouter);



export { app }