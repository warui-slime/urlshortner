import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: String,
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet']
  },
  browser: String,
  country: String
});

export const Analytics = mongoose.model('Analytics', analyticsSchema);