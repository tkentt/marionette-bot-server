import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const getUserId = (request, requireAuth = true) => {
  const headers = request ? request.headers : null;
  const authorizationHeader = headers ?  headers.authorization : null;

  if (authorizationHeader) {
    const token = authorizationHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.user;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }

  return null;
};

export default getUserId;