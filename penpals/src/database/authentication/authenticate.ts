import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../../app/interfaces/user';

const localURL: string = 'mongodb://localhost:27017/penpals';

const app = express();
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  friends: [String],
});

const UserModel = mongoose.model('User', userSchema);

mongoose.connect(localURL);

interface UserDocument extends User, mongoose.Document {}

app.get('/fetch/:username', async (req: Request, res: Response) => {
  const { username } = req.params;
  const { password } = req.params;

  try {
    let user = await UserModel.findOne({ username });

    if (!user) {
      user = await UserModel.create({
        username,
        password: '',
        friends: [],
      });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default app;
