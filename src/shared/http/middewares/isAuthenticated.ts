import AppError from '@shared/erros/AppError';
import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Jwt Token is missing');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}
