import { Router } from 'express'
import { schemaValidation } from '../../shared/middleware/schema'
import {
  createUsuarioDetalle,
  deleteUsuarioDetalle,
  getUsuarioDetalle,
  getUsuariosDetalle,
  updateUsuarioDetalle
} from './usuario_detalle.controller'
import { usuarioDetalleSchema } from './usuario_detalle.schema'

const router = Router()

router.get('/', getUsuariosDetalle)
router.get('/:id', getUsuarioDetalle)
router.post('/', schemaValidation(usuarioDetalleSchema), createUsuarioDetalle)
router.put('/:id', schemaValidation(usuarioDetalleSchema), updateUsuarioDetalle)
router.delete('/:id', deleteUsuarioDetalle)

export default router
