const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
// config
dotenv.config({path:"./config/config.env"})

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

const errorMiddleware = require("./middleware/error");

// app.use(cors());
app.use(cors({
    origin:["http://localhost:3000","https://fullstack-ecommerce-allfea.vercel.app"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1",user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;



// "proxy": "http://192.168.56.1:4000"

// FRONTEND_URL = "http://localhost:3000"