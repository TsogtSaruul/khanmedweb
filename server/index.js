import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser'; 
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";
import funfactRoutes from "./routes/funfactRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import callactionRoutes from "./routes/callactionRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import visionRoutes from "./routes/visionRoutes.js";
import socialRoutes from "./routes/socialRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";


// configure env
dotenv.config();

// databse config
connectDB();

// rest object
const app = express();

// middelwares
// app.use(cors({
//   origin: ["https://khanmed-clinic-client.vercel.app"],
//   methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//   credentials: true
// }));
app.use(cors({}));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("dev"));

// routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/department", departmentRoutes);
app.use("/service", serviceRoutes);
app.use("/testimonial", testimonialRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/slider", sliderRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/feature", featureRoutes);
app.use("/funfact", funfactRoutes);
app.use("/about", aboutRoutes);
app.use("/callaction", callactionRoutes);
app.use("/client", clientRoutes);
app.use("/faq", faqRoutes);
app.use("/pricing", pricingRoutes);
app.use("/vision", visionRoutes);
app.use("/social", socialRoutes);
app.use("/email", emailRoutes);


// rest api
app.get("/", (req, res) => {
  res.send("<h1>THE SERVER IS RUNNING!</h1>");
});

// PORT
const PORT = 5000;

// run listen
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`
      .bgCyan
      .white
  );
});

export default app;