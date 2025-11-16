// import mongoose from "mongoose";

// const ReservationSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   customerName: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   numberOfPeople: { type: Number, required: true },
//   tableNumber: { type: String, default: "" }, // Will be assigned by restaurant
//   specialRequests: { type: String, default: "" },
//   status: { type: String, enum: ['pending', 'confirmed', 'seated', 'completed', 'cancelled'], default: 'pending' },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Reservation', ReservationSchema);

import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  orderDetails: { type: String, required: true }, // What the user wants to order
  specialRequests: { type: String, default: "" },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Reservation', ReservationSchema);