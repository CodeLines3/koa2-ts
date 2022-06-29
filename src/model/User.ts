import { model, Schema } from 'mongoose';
const UserScheme: Schema = new Schema({
  id: { type: String, unique: true },
  name: String,
  age: Number,
  addr: String,
});

const User = model('user', UserScheme);
export default User;
