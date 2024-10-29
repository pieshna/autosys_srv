import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import usuarioModel from '../usuario/usuario.model'
import usuario_detalleModel from '../usuarios_detalle/usuario_detalle.model'
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
    const {
      usuario_id,
      telefono,
      direccion,
      especialidad,
      porcentaje,
      ...resto
    } = req.body
    if (usuario_id) {
      const trabajador = await trabajadorModel.create({
        usuario_id,
        especialidad,
        porcentaje
      })
      if (telefono && direccion)
        await usuario_detalleModel.create({ usuario_id, telefono, direccion })
      else if (telefono)
        await usuario_detalleModel.create({ usuario_id, telefono })
      else if (direccion)
        await usuario_detalleModel.create({ usuario_id, direccion })
      handleDataAndResponse(res, trabajador)
    } else {
      const usuario = await usuarioModel.create(resto)
      const trabajador = await trabajadorModel.create({
        usuario_id: usuario[0].id,
        especialidad,
        porcentaje
      })
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
      handleDataAndResponse(res, trabajador)
    }
  }
)

export const updateTrabajador = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { telefono, direccion, dpi, ...resto } = req.body
    const trabajador = await trabajadorModel.update(id, resto)
    const usuario = await trabajadorModel.findById(id)
    if (dpi) {
      await usuarioModel.update(usuario[0].usuario_id, { dpi })
    }
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
