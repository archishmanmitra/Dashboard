import mongoose, {Schema} from 'mongoose';
const repliedReviewSchema = new Schema({
    reviewId: {
      type: String,
      required: true,
      unique: true, // Ensure each review ID is stored only once
    },
  });

  const Reviews=mongoose.model('Replied Review',repliedReviewSchema)

  export {Reviews}