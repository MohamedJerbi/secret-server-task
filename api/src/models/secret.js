const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const secretSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('secret', secretSchema);
