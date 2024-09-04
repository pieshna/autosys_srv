import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import trabajadorModel from './trabajador.model'

export const getTrabajadores = asyncHandler(
  async (req: Request, res: Response) => {
    const trabajadores = await trabajadorModel.findAll()
    handleDataAndResponse(res, trabajadores)
  }
)

export const getTrabajador = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const trabajador = await trabajadorModel.findById(id)
    handleDataAndResponse(res, trabajador)
  }
)

export const createTrabajador = asyncHandler(
  async (req: Request, res: Response) => {
    const trabajador = await trabajadorModel.create(req.body)
    handleDataAndResponse(res, trabajador)
  }
)

export const updateTrabajador = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const trabajador = await trabajadorModel.update(id, req.body)
    handleDataAndResponse(res, trabajador)
  }
)

export const deleteTrabajador = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const trabajador = await trabajadorModel.delete(id)
    handleDataAndResponse(res, trabajador)
  }
)
