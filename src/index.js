import dotenv from "dotenv";
import { app } from "./app.js";
import connectDb from "./db/index.js";



dotenv.config({
    path: "./.env",
});


connectDb();
app.on("error", (error) => {
    console.log("ERR: ", error);
    throw error;
});

app.use("/",(req,res) => {

    return res.send("hello world");
});


app.listen(process.env.PORT, () => {
    console.log(`Travel Backend is running on ${process.env.PORT}`)
})