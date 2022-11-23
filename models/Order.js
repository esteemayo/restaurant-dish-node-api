import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: [true, 'An order must belong to a customer'],
  },
  total: {
    type: Number,
    required: [true, 'An order must have a total amount'],
  },
  status: {
    type: Number,
    default: 0,
  },
  method: {
    type: Number,
  },
  processedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
