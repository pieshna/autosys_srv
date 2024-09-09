import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
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
    const cliente = await ClienteModel.create(req.body)
    handleDataAndResponse(res, cliente)
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
