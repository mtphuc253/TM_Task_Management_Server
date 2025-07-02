/* eslint-disable no-console */
import Joi from 'joi'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const validCondition = Joi.object({
    title: Joi.string().min(3).max(50).required().trim().strict().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least {#limit} characters',
      'string.max': 'Title must not exceed {#limit} characters',
      'string.trim': 'Title must not have leading or trailing WHITESPACE',
      'any.required': 'Title is required'
    }),
    description: Joi.string().min(3).max(256).required().trim().strict().messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description must be at least {#limit} characters',
      'string.max': 'Description must not exceed {#limit} characters',
      'string.trim': 'Description must not have leading or trailing WHITESPACE',
      'any.required': 'Description is required'
    })
  })

  try {
    console.log('resquest body:', req.body)
    await validCondition.validateAsync(req.body, { abortEarly: false }) //abortEarly=false: không phép dừng lại khi gặp lỗi -> vẫn chạy tiếp để validate description nếu title invalid

    next() //validate data hợp lệ thì cho request đến bước controller
  } catch (error) {
    const errorMessage = error.message
    // const errorMessage2 = new Error(error).message

    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    // const customError2 = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage2)


    console.log('Invalid request:', error)
    next(customError)
  }
}

export const boardValidation = {
  createNew
}