import mongoose from 'mongoose';
import Menu from './Menu.js';

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

reviewSchema.statics.calcAverageRatings = async function (menuId) {
  const stats = await this.aggregate([
    {
      $match: { menu: menuId },
    },
    {
      $group: {
        _id: '$menu',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Menu.findByIdAndUpdate(menuId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Menu.findByIdAndUpdate(menuId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.menu);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  await doc.constructor.calcAverageRatings(this.r.menu);
  next();
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
