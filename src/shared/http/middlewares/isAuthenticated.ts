import { Request, Response, NextFunction } from 'express';
import {
    verify,
    Secret,
    TokenExpiredError,
    JsonWebTokenError,
} from 'jsonwebtoken';
import jwtConfig from '@config/auth';


interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({
            status: 400,
            error: 'JWT Token is missing.',
        });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, jwtConfig.secret as Secret);

        const { sub } = decodeToken as TokenPayload;

        req.user = {
            id: sub,
        };

        console.log(decodeToken);

        return next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({
                status: 403,
                error: 'JWT Token has expired.',
            });
        }

        if (error instanceof JsonWebTokenError) {
            res.status(401).json({
                status: 403,
                error: 'JWT Token Error.',
            });
        }
    }
}

export { isAuthenticated };
