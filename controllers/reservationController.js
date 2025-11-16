// import Reservation from "../models/Reservation.js";
// import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
// import ErrorHandler from "../middleware/error.js";

// // controllers/reservationController.js
// export const getReservations = catchAsyncErrors(async (req, res) => {
//   const reservations = await Reservation.find().populate("user", "name email");
  
//   // Debug: log what's being sent
//   console.log("Sending reservations:", reservations.map(res => ({
//     id: res._id,
//     customerName: res.customerName,
//     specialRequests: res.specialRequests
//   })));
  
//   res.status(200).json({
//     success: true,
//     reservations,
//   });
// });
// export const makeReservation = catchAsyncErrors(async (req, res, next) => {
//   const { customerName, phoneNumber, date, time, numberOfPeople, specialRequests } = req.body;

//   if (!customerName || !phoneNumber || !date || !time || !numberOfPeople) {
//     return next(new ErrorHandler("All fields are required", 400));
//   }

//   // Check for existing reservation at same date and time
//   const existingReservation = await Reservation.findOne({
//     date: new Date(date),
//     time: time,
//     status: { $in: ['pending', 'confirmed', 'seated'] }
//   });

//   if (existingReservation) {
//     return next(new ErrorHandler("This time slot is already booked. Please choose another time.", 400));
//   }

//   const reservation = await Reservation.create({
//     user: req.user.id,
//     customerName,
//     phoneNumber,
//     date,
//     time,
//     numberOfPeople,
//     specialRequests,
//   });

//   res.status(201).json({
//     success: true,
//     message: "Table reservation requested successfully! We will confirm shortly.",
//     reservation,
//   });
// });

// export const updateReservationStatus = catchAsyncErrors(async (req, res, next) => {
//   const { status, tableNumber } = req.body;
//   const { id } = req.params;

//   const reservation = await Reservation.findById(id);
//   if (!reservation) {
//     return next(new ErrorHandler("Reservation not found!", 404));
//   }

//   reservation.status = status;
//   if (tableNumber) {
//     reservation.tableNumber = tableNumber;
//   }
  
//   await reservation.save();

//   res.status(200).json({
//     success: true,
//     message: "Reservation updated successfully!",
//     reservation,
//   });
// });

// export const deleteReservation = catchAsyncErrors(async (req, res, next) => {
//   const { id } = req.params;
  
//   const reservation = await Reservation.findById(id);
//   if (!reservation) {
//     return next(new ErrorHandler("Reservation not found!", 404));
//   }

//   await reservation.deleteOne();

//   res.status(200).json({
//     success: true,
//     message: "Reservation deleted successfully!",
//   });
// });


import Reservation from "../models/Reservation.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";

export const getReservations = catchAsyncErrors(async (req, res) => {
  const reservations = await Reservation.find().populate("user", "name email");
  
  // console.log("Sending reservations:", reservations);
  
  res.status(200).json({
    success: true,
    reservations,
  });
});

export const makeReservation = catchAsyncErrors(async (req, res, next) => {
  const { customerName, orderDetails, specialRequests } = req.body;

  // console.log("Received reservation data:", req.body);

  // Simple validation for required fields
  if (!customerName || !orderDetails) {
    return next(new ErrorHandler("Name and order details are required", 400));
  }

  // Create the reservation
  const reservation = await Reservation.create({
    user: req.user.id,
    customerName,
    orderDetails,
    specialRequests: specialRequests || "",
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully!",
    reservation,
  });
});

export const updateReservationStatus = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  const reservation = await Reservation.findById(id);
  if (!reservation) {
    return next(new ErrorHandler("Order not found!", 404));
  }

  reservation.status = status;
  await reservation.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully!",
    reservation,
  });
});

export const deleteReservation = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    return next(new ErrorHandler("Order not found!", 404));
  }

  await reservation.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully!",
  });
});