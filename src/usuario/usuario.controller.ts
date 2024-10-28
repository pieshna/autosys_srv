import { Request, Response } from 'express'
import { hashString } from '../shared/components/auth/encriptar'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import usuarioModel from './usuario.model'

export const getUsuarios = asyncHandler(async (req: Request, res: Response) => {
  const usuarios = await usuarioModel.findAll()
  handleDataAndResponse(res, usuarios)
})

export const getUsuario = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const usuario = await usuarioModel.findById(id)
  handleDataAndResponse(res, usuario)
})

export const getMyData = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const usuario = await usuarioModel.myData(id)
  handleDataAndResponse(res, usuario)
})

export const createUsuario = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.body.password) req.body.password = hashString(req.body.password)
    const usuario = await usuarioModel.create(req.body)
    handleDataAndResponse(res, usuario)
  }
)

export const createNewUsuarioWithDetails = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.body.password) req.body.password = hashString(req.body.password)
    const usuario = await usuarioModel.newUserWithDetail(req.body)
    handleDataAndResponse(res, usuario)
  }
)

export const updateUsuario = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    if (req.body.password) req.body.password = hashString(req.body.password)
    const usuario = await usuarioModel.update(id, req.body)
    handleDataAndResponse(res, usuario)
  }
)

export const deleteUsuario = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const usuario = await usuarioModel.delete(id)
    handleDataAndResponse(res, usuario)
  }
)
