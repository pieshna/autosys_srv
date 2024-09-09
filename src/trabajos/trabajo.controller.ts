import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import TrabajoModel from './trabajo.model'

export const getTrabajos = asyncHandler(async (req: Request, res: Response) => {
  const trabajos = await TrabajoModel.findAll()
  handleDataAndResponse(res, trabajos)
})

export const getTrabajo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const trabajo = await TrabajoModel.findById(id)
  handleDataAndResponse(res, trabajo)
})

export const createTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const trabajo = await TrabajoModel.create(req.body)
    handleDataAndResponse(res, trabajo)
  }
)

export const updateTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const trabajo = await TrabajoModel.update(id, req.body)
    handleDataAndResponse(res, trabajo)
  }
)

export const deleteTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const trabajo = await TrabajoModel.delete(id)
    handleDataAndResponse(res, trabajo)
  }
)
