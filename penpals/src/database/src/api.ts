import express from 'express';
import { Request, Response } from 'express';
import UserModel from '../../app/interfaces/user';

const api = express.Router();

// Sign In
api.get('/signin/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    let user = await UserModel.findOne({ username });

    if (!user) {
      res.status(404).json({ message: 'Invalid username' });
      return;
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: (error as Error).message });
  }
});

module.exports = api;
