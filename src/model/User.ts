import { Document, model, Schema, Types } from 'mongoose';
const UserSchema: Schema = new Schema({
  name: { type: String, unique: true, require: true },
  password: String,
  age: Number,
  addr: String
});
UserSchema.set('toJSON', { versionKey: false, transform: (doc: Document, ret: any) => {
  // delete ret._id
} });
const User = model('user', UserSchema);
export default User;
