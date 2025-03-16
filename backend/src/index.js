import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/dbConfig.js";
import EventModel from "./models/event.models.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import protectedRouter from "./routes/protected.routes.js";
import cookieParser from 'cookie-parser'
import {Admin} from "./models/admin.models.js";
import {getReviews} from "./api/apify.js";
import { authenticateAdmin } from "./middleware/auth.middleware.js";
import reviewsRouter from "./routes/repliedReviews.routes.js"
import { main } from "./api/placesApi.js";
;
dotenv.config({});
const app = express();
const port = process.env.PORT || 4000;

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "https://dashboard-front-e6i9.onrender.com",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie']
}));
app.use(cookieParser());
app.use(express.json());

export const dbName = "starboom";
// to get reviews : 
app.get('/api/reviews',getReviews)
app.get('/api/places',main)
app.use('/api',reviewsRouter)
// API to log a scan
// app.post('/api/log-scan', async (req, res) => {
//   try {
//     // Find the document or create it if it doesn't exist
//     let scanData = await ScanModel.findOne();
//     if (!scanData) {
//       scanData = new ScanModel();
//     }
//     scanData.scans += 1; // Increment scan count
//     await scanData.save();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// });
app.post('/api/log-scan', async (req, res) => {
  try {
    const event = new EventModel({ type: 'scan' });
    await event.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// API to log a button click
// app.post('/api/log-button-click', async (req, res) => {
//   try {
//     let scanData = await ScanModel.findOne();
//     if (!scanData) {
//       scanData = new ScanModel();
//     }
//     scanData.buttonClicks += 1; // Increment button click count
//     await scanData.save();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// });
app.post('/api/log-button-click', async (req, res) => {
  try {
    const event = new EventModel({ type: 'buttonClick' });
    await event.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

function getStartAndEndOfWeek(date) {
  const startOfWeek = new Date(date);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // End of week (Saturday)
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
}
// API to get scan and button click counts
// app.get('/api/get-counts', async (req, res) => {
//   try {
//     let scanData = await ScanModel.findOne();
//     if (!scanData) {
//       scanData = { scans: 0, buttonClicks: 0 }; // Default values if no data exists
//     }
//     res.send({ scanCount: scanData.scans, buttonClickCount: scanData.buttonClicks });
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// });
app.get('/api/get-counts', async (req, res) => {
  try {
    const totalScans = await EventModel.countDocuments({ type: 'scan' });
    const totalButtonClicks = await EventModel.countDocuments({ type: 'buttonClick' });

    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(new Date());
    const currentWeekEvents = await EventModel.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });

    const previousWeekStart = new Date(startOfWeek);
    previousWeekStart.setDate(startOfWeek.getDate() - 7);
    const previousWeekEnd = new Date(endOfWeek);
    previousWeekEnd.setDate(endOfWeek.getDate() - 7);

    const previousWeekEvents = await EventModel.find({
      timestamp: { $gte: previousWeekStart, $lte: previousWeekEnd },
    });

    const currentWeekScans = currentWeekEvents.filter((e) => e.type === 'scan').length;
    const currentWeekClicks = currentWeekEvents.filter((e) => e.type === 'buttonClick').length;
    const previousWeekScans = previousWeekEvents.filter((e) => e.type === 'scan').length;
    const previousWeekClicks = previousWeekEvents.filter((e) => e.type === 'buttonClick').length;

    const scanRate = ((currentWeekScans - previousWeekScans) / previousWeekScans) * 100;
    const clickRate = ((currentWeekClicks - previousWeekClicks) / previousWeekClicks) * 100;

    res.send({
      totalScans,
      totalButtonClicks,
      currentWeekScans,
      currentWeekClicks,
      previousWeekScans,
      previousWeekClicks,
      scanRate: scanRate === Infinity ? 100:  scanRate.toFixed(2),
      clickRate: clickRate === Infinity ? 100:  clickRate.toFixed(2),
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});
  // app.use('/api',getSentimentAnalyis)
// Auth routes
  app.use('/api', authRouter);
  app.use("/api/milestone", adminRouter);
  app.use("/api",protectedRouter)
// Database connection Here: 

connectDB()
.then(async() => {
  await Admin.initAdmin();
  console.log("Database connection established");
  app.listen(port, () => {  console.log(`Server running on port ${port}`);});
})
.catch((err) => {
  console.error("Error connecting to database: ", err);
});