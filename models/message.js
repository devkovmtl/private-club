const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    text: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = model('Message', MessageSchema);
