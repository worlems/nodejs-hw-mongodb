import createHttpError from 'http-errors';
import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  //   const { autorization } = req.headers;
  const authorization = req.get('Authorization');

  if (!authorization) {
    return next(createHttpError(401, 'Authorization header missing'));
  }

  const [bearer, accessToken] = authorization.split(' ');
  if (bearer !== 'Bearer')
    return next(
      createHttpError(401, 'Authorization header must be Bearer type'),
    );

  const session = await findSession({ accessToken });
  if (!session) return next(createHttpError(401, 'Sesssion not found'));

  if (session.accessTokenValidUntil < Date.now()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  req.user = user;
  next();
};
