import mongoose from 'mongoose';

export interface UrlModel extends mongoose.Document {
  fileSizeBytes: number;
  url: string;
  createdAt: Date;
}

const urlSchema = new mongoose.Schema({
  fileSizeBytes: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UrlPhoto = mongoose.model<UrlModel>('UrlPhoto', urlSchema);
 
export {UrlPhoto};