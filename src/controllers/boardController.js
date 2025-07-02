/* eslint-disable no-console */
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('resquest body:', req.body)

    res.status(StatusCodes.CREATED).json({
      message: 'API Controller create new boards.',
      status: ReasonPhrases.CREATED
    })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}