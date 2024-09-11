import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import usuarioModel from '../usuario/usuario.model'
import ClienteModel from './cliente.model'

export const getClientes = asyncHandler(async (req: Request, res: Response) => {
  const clientes = await ClienteModel.findAll()
  handleDataAndResponse(res, clientes)
})

export const getCliente = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const cliente = await ClienteModel.findById(id)
  handleDataAndResponse(res, cliente)
})

export const createCliente = asyncHandler(
  async (req: Request, res: Response) => {
    const { usuario_id, ...resto } = req.body
    if (usuario_id) {
      const cliente = await ClienteModel.create({ usuario_id })
      handleDataAndResponse(res, cliente)
    } else {
      const usuario = await usuarioModel.create(resto)
      const cliente = await ClienteModel.create({ usuario_id: usuario[0].id })
      handleDataAndResponse(res, cliente)
    }
  }
)

export const updateCliente = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const cliente = await ClienteModel.update(id, req.body)
    handleDataAndResponse(res, cliente)
  }
)

export const deleteCliente = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const cliente = await ClienteModel.delete(id)
    handleDataAndResponse(res, cliente)
  }
)
