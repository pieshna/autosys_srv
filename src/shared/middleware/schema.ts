import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { handleError } from '../tools/fetchResponses'

export const schemaValidation =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      //const id = req.body.userId
      if (Array.isArray(req.body)) {
        req.body = req.body.map((obj) => {
          const newBody = schema.parse(obj)
          /*if (id) {
            newBody.creado_por = id
            newBody.actualizado_por = id
          }*/
          return newBody
        })
      } else {
        req.body = schema.parse(req.body)
        /*if (id) {
          req.body.creado_por = id
          req.body.actualizado_por = id
        }*/
      }
      next()
    } catch (error: any) {
      if (error instanceof ZodError) {
        const resultError = error.issues.map((issue) => {
          return {
            path: issue.path[0],
            message: issue.message
          }
        })
        return handleError(res, resultError, 400)
      }
      return handleError(res, error)
    }
  }
