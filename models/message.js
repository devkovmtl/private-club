const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

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

MessageSchema.virtual('createdAtFormatted').get(function () {
  return `${DateTime.fromJSDate(this.createdAt).toLocaleString(
    DateTime.DATE_SHORT
  )}, ${DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.TIME_24_SIMPLE)}`;
});

module.exports = model('Message', MessageSchema);
