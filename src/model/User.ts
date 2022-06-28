import { model, Schema } from 'mongoose';
const UserScheme: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  age: Number,
  addr: String,
});

const User = model('user', UserScheme);
module.exports = User;
