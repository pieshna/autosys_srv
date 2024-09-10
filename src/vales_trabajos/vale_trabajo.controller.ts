import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import valeTrabajoModel from './vale_trabajo.model'

export const getValesTrabajos = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await valeTrabajoModel.findAll()
    handleDataAndResponse(res, data)
  }
)

export const getValeTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await valeTrabajoModel.findById(id)
    handleDataAndResponse(res, data)
  }
)

export const createValeTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await valeTrabajoModel.create(req.body)
    handleDataAndResponse(res, data)
  }
)

export const updateValeTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await valeTrabajoModel.update(id, req.body)
    handleDataAndResponse(res, data)
  }
)

export const deleteValeTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const data = await valeTrabajoModel.delete(id)
    handleDataAndResponse(res, data)
  }
)
