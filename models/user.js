const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    isMember: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

UserSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`;
});

module.exports = model('User', UserSchema);
