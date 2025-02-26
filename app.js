const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

if(process.env.NODE_ENV !== "production"){
  require("dotenv").config({path:"./config/.env"});
}

app.use(
    cors({
      origin:process.env.FRONTEND_SERVER, // Replace with your frontend URL
      credentials: true, // Allows cookies to be sent with the request
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
  );

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const user = require("./controller/user/user.js");
const shop = require("./controller/shop/shop.js");
const product = require("./controller/product/product.js");
const event = require("./controller/events/event.js");
const coupon = require("./controller/couponCode/couponCode.js");
const payment = require("./controller/payment/payment.js");
const order = require("./controller/order/order.js");
const conversation = require("./controller/conversation/conversation.js");
const message = require("./controller/message.js");
const withdraw = require("./controller/withdraw/withdraw.js");

// ROUTES

// app.get("/test", (req, res) => {
//     res.send(`Backend is running! and frontend server:- ${process.env.FRONTEND_SERVER}\n databaseIs: ${process.env.DB_URL}`);
//   });
  
app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
