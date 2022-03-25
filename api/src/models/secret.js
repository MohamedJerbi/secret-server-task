import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';

const secretSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
    },
    secretText: {
      type: String,
      required: true,
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

secretSchema.pre('save', function (next) {
  this.hash = this._id;
  // Encrypting secret text
  this.secretText = CryptoJS.AES.encrypt(
    this.secretText,
    process.env.PASS
  ).toString();
  next();
});

secretSchema.post('init', function (doc) {
  // Decrypting secret text
  if (doc.secretText) {
    const bytes = CryptoJS.AES.decrypt(doc.secretText, process.env.PASS);
    doc.secretText = bytes.toString(CryptoJS.enc.Utf8);
  }
});

export default mongoose.model('secret', secretSchema);
