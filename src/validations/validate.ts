import ResponseError from '../exceptions/ResponseError'
import type Joi from 'joi'

const validate = (schema: Joi.Schema, request: any): any => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  })
  if (result.error != null) {
    throw new ResponseError(400, result.error.message)
  } else {
    return result.value
  }
}

export default validate
