import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import rolModel from './rol.model'

export const getRoles = asyncHandler(async (req: Request, res: Response) => {
  const roles = await rolModel.findAll()
  handleDataAndResponse(res, roles)
})

export const getRol = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const rol = await rolModel.findById(id)
  handleDataAndResponse(res, rol)
})

export const createRol = asyncHandler(async (req: Request, res: Response) => {
  const rol = await rolModel.create(req.body)
  handleDataAndResponse(res, rol)
})

export const updateRol = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const rol = await rolModel.update(id, req.body)
  handleDataAndResponse(res, rol)
})

export const deleteRol = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const rol = await rolModel.delete(id)
  handleDataAndResponse(res, rol)
})
