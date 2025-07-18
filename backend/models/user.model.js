import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  totalPoints: { type: Number, default: 0 },
});

// Force Mongoose to ensure the index exists
userSchema.index({ name: 1 }, { unique: true });

const RatingUser = mongoose.model("RatingUser", userSchema);
export default RatingUser;
