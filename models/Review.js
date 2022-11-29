import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  remarks: {
    type: String,
    trim: true,
    required: [true, 'A review must have remarks'],
  },
  rating: {
    type: Number,
    min: [1, 'Rating must not below 1.0'],
    max: [5, 'Rating must not be above 5.0'],
  },
  menu: {
    type: mongoose.Types.ObjectId,
    ref: 'Menu',
    required: ['A review must belong to a menu'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'A review must belong to a user'],
  },
}, {
  timestamps: true,
});

reviewSchema.index({ menu: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
