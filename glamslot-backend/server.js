const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const Booking = require("./models/Booking");
const auth=require('./middlewares/auth')
dotenv.config()

const app=express()
app.use(cors({
  origin: [
    "https://glamslot-ten.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

// Handle preflight requests
// app.options("*", cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB")
}).catch(err=>{
console.log("Error connecting to MongoDB:",err)
})
app.get('/api/protected',auth,(req,res)=>{
    res.json({message:"This is a protected route",user:req.user})
})
app.use('/api/services',require('./routes/services'))
app.use('/api/bookings',require('./routes/bookings'))
app.use("/api/staff", require("./routes/staff"));
app.use("/api/availability", require("./routes/staffAvailability"));
app.use("/api/holidays", require("./routes/holidays"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/salons", require("./routes/salons"));
app.use("/api/styles", require("./routes/styles"));
app.use("/api/referrals", require("./routes/referrals"));
app.use("/api/giftcards", require("./routes/giftcards"));
app.use("/api/products", require("./routes/products"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/users", require("./routes/users"));
app.get('/',(req,res)=>{
    res.send('Glamslot Backend is running...')
})
app.use('/api/auth',require('./routes/auth'))
setInterval(async () => {
  try {
    const now = new Date();

    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().slice(0, 5);

    const result = await Booking.updateMany(
      {
        status: "confirmed",
        date: { $lte: today },
        endTime: { $lt: currentTime },
      },
      { status: "completed" }
    );

    if (result.modifiedCount > 0) {
      console.log(`✅ Auto-completed ${result.modifiedCount} bookings`);
    }
  } catch (err) {
    console.error("Auto-complete error", err.message);
  }
}, 2 * 60 * 1000);
const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})