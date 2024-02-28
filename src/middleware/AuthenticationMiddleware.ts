import { NextFunction, Request, Response } from "express";
import { SessionController } from "../controller/SessionController";


export interface AuthenticatedRequest extends Request {
  userId: number;
  
}

export class AuthenticationMiddleware {
  async validateAuthentication(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (request.headers.authorization?.split(" ")[0] == "key"){
      (request as AuthenticatedRequest).userId = Number(request.headers.authorization?.split(" ")[1]);
      next();
      return;
    }
    
    try {
      const token = request.headers.authorization?.split(" ")[1];
      const sessionController = new SessionController();
      const jwtPayload = sessionController.verifyToken(token);
      (request as AuthenticatedRequest).userId = jwtPayload.userId;
      next();
    } catch (error) {
      return response.status(401).json({
        error: error.message,
      });
    }
  }
}


