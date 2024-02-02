import bcrypt from 'bcrypt';
import { sign } from 'react-native-pure-jwt';
import type { Request, Response } from 'express';
import { UserLoaderClass } from '../loaders/UserLoader';

export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
};
// Register User
export const resgisterUser = async () => {
  console.log('hi');
};

// Register User
// export const resgisterUser = async (
//   req: Request,
//   res: Response,
//   instance: UserLoaderClass
// ) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       phoneNumber,
//       email,
//       password,
//       address,
//       city,
//       state,
//       zipCode,
//     } = req.body;

//     const salt = await bcrypt.genSalt();
//     const hashed = await bcrypt.hash(password, salt);

//     const newUser: User = {
//       firstName,
//       lastName,
//       phoneNumber,
//       email,
//       password: hashed,
//       address,
//       city,
//       state,
//       zipCode,
//     };

//     //   handle the save user
//     const savedUser = await instance.upsert(newUser);
//     // res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({
//       email,
//     });

//     if (!user) {
//       return res.status(400).json('User not found');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) res.status(400).json('Invalid Password');

//     const token = jwt.sign({ id: user._id }, 'some secrect');
//     user.password = '';
//     res.status(200).json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };
