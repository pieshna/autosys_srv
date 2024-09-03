import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import usuarioRolModel from './usuario_rol.model'

export const getUsuarioRoles = asyncHandler(
  async (req: Request, res: Response) => {
    const usuarioRoles = await usuarioRolModel.findAll()
    handleDataAndResponse(res, usuarioRoles)
  }
)

export const getUsuarioRol = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const usuarioRol = await usuarioRolModel.findById(id)
    handleDataAndResponse(res, usuarioRol)
  }
)

export const getRolByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const rol = await usuarioRolModel.findRolByUser(id)
    handleDataAndResponse(res, rol)
  }
)

export const getUserByRol = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await usuarioRolModel.findUserByRol(id)
    handleDataAndResponse(res, user)
  }
)

export const createUsuarioRol = asyncHandler(
  async (req: Request, res: Response) => {
    const usuarioRol = await usuarioRolModel.create(req.body)
    handleDataAndResponse(res, usuarioRol)
  }
)

export const updateUsuarioRol = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const usuarioRol = await usuarioRolModel.update(id, req.body)
    handleDataAndResponse(res, usuarioRol)
  }
)

export const deleteUsuarioRol = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const usuarioRol = await usuarioRolModel.delete(id)
    handleDataAndResponse(res, usuarioRol)
  }
)
