import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRY } from '../config';

const createAuthToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
};

export default createAuthToken;