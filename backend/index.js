import express from "express";
import bodyParser from "body-parser";
//import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js"
import connectToDatabase from "./database/db.js";
import cors from "cors";


dotenv.config();

const app = express();
const Port = process.env.PORT || 7000;


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET","POST", "PUT", "DELETE" ],
  credentials: true,

}));


   app.use("/", userRouter);

// Start the server only after connecting to the database
const startServer = async () => {
    await connectToDatabase();
  
    app.listen(Port, (err) => {
      if (err) {
        console.log("Error in server connection", err);
      } else {
        console.log(`Server starting at port ${Port}...`);
      }
    });
  };
  
  startServer();
