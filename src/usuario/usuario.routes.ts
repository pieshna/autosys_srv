import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createNewUsuarioWithDetails,
  createUsuario,
  deleteUsuario,
  getMyData,
  getUsuario,
  getUsuarios,
  updateUsuario
} from './usuario.controller'
import { nuevoUsuarioSchema, usuarioSchema } from './usuario.schema'

const router = Router()

router.get('/', getUsuarios)
router.get('/mydata/:id', getMyData)
router.get('/:id', getUsuario)
router.post('/', schemaValidation(usuarioSchema), createUsuario)
router.post(
  '/newuser',
  schemaValidation(nuevoUsuarioSchema),
  createNewUsuarioWithDetails
)
router.put('/:id', schemaValidation(usuarioSchema), updateUsuario)
router.delete('/:id', deleteUsuario)

export default router
