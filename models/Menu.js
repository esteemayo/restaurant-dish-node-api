import slugify from 'slugify';
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A menu must have a name'],
  },
  slug: String,
  price: {
    type: Number,
    required: [true, 'A menu must have a price'],
  },
  image: {
    type: String,
  },
  ingredients: {
    type: String,
    required: [true, 'A menu must have ingredients'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [1, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

menuSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'menu',
});

menuSchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name, { lower: true });

  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const menuWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (menuWithSlug.length) {
    this.slug = `${this.slug}-${menuWithSlug.length + 1}`;
  }
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);

export default Menu;
