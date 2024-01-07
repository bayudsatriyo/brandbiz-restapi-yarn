import ResponseError from '../exceptions/ResponseError'
import { type Request, type Response, type NextFunction } from 'express'

function errorMiddleware (
  err: TypeError,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err === undefined || err === null) {
    next()
    return
  }
  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message
    }).end()
  } else {
    res.status(500).json({
      errors: err.message
    }).end()
  }
}

export default errorMiddleware
