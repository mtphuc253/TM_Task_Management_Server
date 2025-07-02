import express from 'express'
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

const Router = express.Router();

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'API get list boards.',
      status: ReasonPhrases.OK
    })
  })
  .post(boardValidation.createNew, boardController.createNew)

export const boardRoutes = Router
