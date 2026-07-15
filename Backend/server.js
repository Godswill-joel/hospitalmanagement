import express from "express";
import cors from 'cors';
import 'dotenv/config';
import {clerkMiddleware} from '@clerk/express';
import { connectDB } from "./config/db.js";
import doctorRouter from "./routes/doctorRouter.js";


 
const app = express();
const port = 4000;
// dotenv.config();



//middleware 
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded ({limit: "20mb", extended: true}));

//DB
connectDB()


//Routes
app.use("/api/doctor", doctorRouter);

app.get('/', (req, res) =>{
    res.send("API Working ")
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})