import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import registro_tiemposModel from './registro_tiempos.model'

export const getRegistroTiempos = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await registro_tiemposModel.findAll()
    handleDataAndResponse(res, data)
  }
)

export const getRegistroTiempo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await registro_tiemposModel.findById(id)
    handleDataAndResponse(res, data)
  }
)

export const createRegistroTiempo = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await registro_tiemposModel.create(req.body)
    handleDataAndResponse(res, data)
  }
)

export const updateRegistroTiempo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await registro_tiemposModel.update(id, req.body)
    handleDataAndResponse(res, data)
  }
)

export const deleteRegistroTiempo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await registro_tiemposModel.delete(id)
    handleDataAndResponse(res, data)
  }
)
