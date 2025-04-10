import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const linkSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    unique: true,
    default: () => nanoid(6)
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  expirationDate:
  {
    type:Date,
    default:()=>{
      const now = new Date();
      now.setDate(now.getDate() + 7); 
      return now;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



linkSchema.index({ expirationDate: 1 });

export const Link = mongoose.model('Link', linkSchema);