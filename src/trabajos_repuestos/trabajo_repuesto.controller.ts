import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import trabajoRepuestoModel from './trabajo_repuesto.model'

export const getTrabajoRepuestos = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await trabajoRepuestoModel.findAll()
    handleDataAndResponse(res, data)
  }
)

export const getTrabajoRepuesto = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await trabajoRepuestoModel.findById(id)
    handleDataAndResponse(res, data)
  }
)

export const createTrabajoRepuesto = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await trabajoRepuestoModel.create(req.body)
    handleDataAndResponse(res, data)
  }
)

export const updateTrabajoRepuesto = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await trabajoRepuestoModel.update(id, req.body)
    handleDataAndResponse(res, data)
  }
)

export const deleteTrabajoRepuesto = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await trabajoRepuestoModel.delete(id)
    handleDataAndResponse(res, data)
  }
)
