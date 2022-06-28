import { model, Schema } from 'mongoose';
const UserScheme: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  age: Number,
  addr: String,
});

const User = model('Category', UserScheme);
export default User;
