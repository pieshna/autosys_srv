import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import usuarioModel from '../usuario/usuario.model'
import usuario_detalleModel from '../usuarios_detalle/usuario_detalle.model'
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
    const { usuario_id, telefono, direccion, ...resto } = req.body
    if (usuario_id) {
      const cliente = await ClienteModel.create({ usuario_id })
      if (telefono && direccion)
        await usuario_detalleModel.create({ usuario_id, telefono, direccion })
      else if (telefono)
        await usuario_detalleModel.create({ usuario_id, telefono })
      else if (direccion)
        await usuario_detalleModel.create({ usuario_id, direccion })
      handleDataAndResponse(res, cliente)
    } else {
      const usuario = await usuarioModel.create(resto)
      const cliente = await ClienteModel.create({ usuario_id: usuario[0].id })
      if (telefono && direccion)
        await usuario_detalleModel.create({
          usuario_id: usuario[0].id,
          telefono,
          direccion
        })
      else if (telefono)
        await usuario_detalleModel.create({
          usuario_id: usuario[0].id,
          telefono
        })
      else if (direccion)
        await usuario_detalleModel.create({
          usuario_id: usuario[0].id,
          direccion
        })
      handleDataAndResponse(res, cliente)
    }
  }
)

export const updateCliente = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { telefono, direccion, ...resto } = req.body
    const cliente = await ClienteModel.update(id, resto)
    const usuario = await ClienteModel.findById(id)
    if (telefono && direccion) {
      const exists = await usuario_detalleModel.findByField(
        'usuario_id',
        usuario[0].usuario_id
      )
      if (exists.length > 0)
        await usuario_detalleModel.update(usuario[0].usuario_id, {
          telefono,
          direccion
        })
      else
        await usuario_detalleModel.create({
          usuario_id: usuario[0].usuario_id,
          telefono,
          direccion
        })
    } else if (telefono) {
      const exists = await usuario_detalleModel.findByField(
        'usuario_id',
        usuario[0].usuario_id
      )
      if (exists.length > 0)
        await usuario_detalleModel.update(usuario[0].usuario_id, { telefono })
      else
        await usuario_detalleModel.create({
          usuario_id: usuario[0].usuario_id,
          telefono
        })
    } else if (direccion) {
      const exists = await usuario_detalleModel.findByField(
        'usuario_id',
        usuario[0].usuario_id
      )
      if (exists.length > 0)
        await usuario_detalleModel.update(usuario[0].usuario_id, { direccion })
      else
        await usuario_detalleModel.create({
          usuario_id: usuario[0].usuario_id,
          direccion
        })
    }
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
