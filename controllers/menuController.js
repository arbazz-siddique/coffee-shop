// controllers/menuController.js
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import MenuItem from "../models/MenuItem.js"
import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from '../middleware/error.js';
export const getMenuItems = catchAsyncErrors(async (req, res) => {
  
    const menuItems = await MenuItem.find();
    res.status(200).json({
      success: true,
      menuItems,
    });
  
});

export const addMenuItem = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Product Image is Required!", 400));
  }

  const { image } = req.files;
  const cloudinaryResponse = await cloudinary.uploader.upload(
    image.tempFilePath,
    { folder: "COFFEESHOP" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }

  // ⬇️ ADD arabicName HERE
  const { name, description, price, category, arabicName } = req.body;

  const addmenu = await MenuItem.create({
    name,
    arabicName,   // ⬅️ SAVE IT HERE
    description,
    price,
    category,
    image: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Product is Added.",
    addmenu,
  });
});


export const updateMenuItem = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.params;
  // console.log("ID from params:", id);
  let item= await MenuItem.findById(id);
  if(!item){
    return next(new ErrorHandler("item not found!", 404));
  }

  const { name, description, price, category,arabicName } = req.body;

  item = await MenuItem.findByIdAndUpdate(
    id,
    {name,description, price, category,arabicName },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
  res.status(200).json({
    success: true,
    message: "Item Updated!",
    item,
  });

});



export const deleteMenuItem = catchAsyncErrors(async (req, res,next) => {
  const {id}= req.params;
  let item= await MenuItem.findById(id);
  if(!item){
    return next(new ErrorHandler("It's Already Deleted!", 404));
  }
  const ItemImageId = item.image.public_id;
  await cloudinary.uploader.destroy(ItemImageId);
  await item.deleteOne();

  res.status(200).json({
    success: true,
    message: "Item is  Deleted!",
  });
});
