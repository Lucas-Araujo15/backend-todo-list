import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { StatusCode } from "../config/constants";

export function verifyToken(request: Request, response: Response, next: NextFunction) {
    const token = request.headers['authorization']

    if (!token) {
        return response.status(StatusCode.FORBIDDEN).json({ error: "Nenhum token fornecido"})
    }

    jwt.verify(token.split(' ')[1], 'secret', (err, decoded) => {
        if (err) {
            return response.status(500).json({error: 'Falha ao autenticar o token'})
        }

        request.userId = decoded.id
        request.userRole = decoded.role
        
    })
}