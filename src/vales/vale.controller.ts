import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import valeModel from './vale.model'

export const getVales = asyncHandler(async (req: Request, res: Response) => {
  const data = await valeModel.findAll()
  handleDataAndResponse(res, data)
})

export const getVale = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await valeModel.findById(id)
  handleDataAndResponse(res, data)
})

export const createVale = asyncHandler(async (req: Request, res: Response) => {
  const data = await valeModel.create(req.body)
  handleDataAndResponse(res, data)
})

export const updateVale = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await valeModel.update(id, req.body)
  handleDataAndResponse(res, data)
})

export const deleteVale = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await valeModel.delete(id)
  handleDataAndResponse(res, data)
})
