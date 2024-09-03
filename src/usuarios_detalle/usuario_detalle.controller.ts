import { Request, Response } from 'express'
import { asyncHandler } from '../../shared/middleware/contollers'
import { handleDataAndResponse } from '../../shared/tools/validateDataToResponse'
import usuarioDireccionModel from './usuario_detalle.model'

export const getUsuariosDetalle = asyncHandler(
  async (req: Request, res: Response) => {
    const usuarios_detalle = await usuarioDireccionModel.findAll()
    handleDataAndResponse(res, usuarios_detalle)
  }
)

export const getUsuarioDetalle = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const usuario_detalle = await usuarioDireccionModel.findById(id)
    handleDataAndResponse(res, usuario_detalle)
  }
)

export const createUsuarioDetalle = asyncHandler(
  async (req: Request, res: Response) => {
    const usuario_detalle = await usuarioDireccionModel.create(req.body)
    handleDataAndResponse(res, usuario_detalle)
  }
)

export const updateUsuarioDetalle = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const usuario_detalle = await usuarioDireccionModel.update(id, req.body)
    handleDataAndResponse(res, usuario_detalle)
  }
)

export const deleteUsuarioDetalle = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const usuario_detalle = await usuarioDireccionModel.delete(id)
    handleDataAndResponse(res, usuario_detalle)
  }
)
