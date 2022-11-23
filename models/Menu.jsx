import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A menu must have a name'],
  },
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
}, {
  timestamps: true,
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);

export default Menu;
