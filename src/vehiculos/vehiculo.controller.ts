import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import VehiculoModel from './vehiculo.model'

export const getVehiculos = asyncHandler(
  async (req: Request, res: Response) => {
    const vehiculos = await VehiculoModel.findAll()
    handleDataAndResponse(res, vehiculos)
  }
)

export const getVehiculo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const vehiculo = await VehiculoModel.findById(id)
  handleDataAndResponse(res, vehiculo)
})

export const createVehiculo = asyncHandler(
  async (req: Request, res: Response) => {
    const vehiculo = await VehiculoModel.create(req.body)
    handleDataAndResponse(res, vehiculo)
  }
)

export const updateVehiculo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const vehiculo = await VehiculoModel.update(id, req.body)
    handleDataAndResponse(res, vehiculo)
  }
)

export const deleteVehiculo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const vehiculo = await VehiculoModel.delete(id)
    handleDataAndResponse(res, vehiculo)
  }
)
