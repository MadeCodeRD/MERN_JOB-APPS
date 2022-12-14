import { UnauthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const testUser = payload.userId === '6364088efad7f7f26f895000';
    req.user = { userId: payload.userId, testUser }


    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  }

export default auth;
