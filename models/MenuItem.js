import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
   name: String,
   arabicName: {
  type: String,
  required: true,
},
  price: Number,
  description: String,
  image: {
    public_id: String,
    url: String,
  },
  category: {
    type: String,
    required: true,
    enum: [
  "Vegetable",
  "Non-Veg",
  "Biryani",
  "Breakfast",
  "Tea & Coffee",
  "Soup",
  "Snacks",
  "Fresh Juices",
  "Chinese",
  "Nepali",
  "Burgers & Sandwich",
  "Combo Meal Special",
  "Combo Sandwich",
  "Indian/Pakistani"
]

  },
});
export default mongoose.model('MenuItem', MenuItemSchema);