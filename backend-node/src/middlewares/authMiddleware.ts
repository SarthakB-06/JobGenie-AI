import type {Request , Response,NextFunction} from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import User from '../models/User.js';

export interface AuthRequest extends Request {
    user?: any;
    file?: Express.Multer.File;
}

export const protect = async (req:AuthRequest , res:Response, next:NextFunction) : Promise<void> => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];

            if (!token) {
                res.status(401).json({ message: 'Not authorized, no token' });
                return;
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as JwtPayload

            req.user = await User.findById(decoded.id).select('-password');
            next(); 
        }catch(error){
            res.status(401).json({message: 'Not authorized, token failed'});
        }
    }
    if(!token){
        res.status(401).json({message: 'Not authorized, no token'});
    }
}