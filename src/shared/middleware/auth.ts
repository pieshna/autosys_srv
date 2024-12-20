import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../components/auth/token'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'No se proporcionó un token de acceso' })
  }

  const token = authHeader?.split(' ')[1]

  const payload = verifyToken(token)

  if (!payload) {
    return res.status(401).json({ message: 'Token de acceso no válido' })
  }
  req.body.userId = payload.userId

  next()
}
