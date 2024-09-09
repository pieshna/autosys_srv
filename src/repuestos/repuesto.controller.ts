import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import RepuestoModel from './repuesto.model'

export const getRepuestos = asyncHandler(
  async (req: Request, res: Response) => {
    const repuestos = await RepuestoModel.findAll()
    handleDataAndResponse(res, repuestos)
  }
)

export const getRepuesto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const repuesto = await RepuestoModel.findById(id)
  handleDataAndResponse(res, repuesto)
})

export const createRepuesto = asyncHandler(
  async (req: Request, res: Response) => {
    const repuesto = await RepuestoModel.create(req.body)
    handleDataAndResponse(res, repuesto)
  }
)

export const updateRepuesto = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const repuesto = await RepuestoModel.update(id, req.body)
    handleDataAndResponse(res, repuesto)
  }
)

export const deleteRepuesto = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const repuesto = await RepuestoModel.delete(id)
    handleDataAndResponse(res, repuesto)
  }
)
