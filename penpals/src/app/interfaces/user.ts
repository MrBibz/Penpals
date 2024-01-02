import mongoose, { Document, Schema } from 'mongoose';

export interface User {
    username: string;
    password: string;
    friends: string[];
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    friends: { type: [String], default: [] },
});

const UserModel = mongoose.model<User & Document>('User', UserSchema);

export default UserModel;