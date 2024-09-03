import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createUsuarioRol,
  deleteUsuarioRol,
  getRolByUser,
  getUserByRol,
  getUsuarioRol,
  getUsuarioRoles,
  updateUsuarioRol
} from './usuario_rol.controller'
import { usuarioRolSchema } from './usuario_rol.schema'

const router = Router()

router.get('/', getUsuarioRoles)
router.get('/rol/:id', getRolByUser)
router.get('/user/:id', getUserByRol)
router.get('/:id', getUsuarioRol)
router.post('/', schemaValidation(usuarioRolSchema), createUsuarioRol)
router.put('/:id', schemaValidation(usuarioRolSchema), updateUsuarioRol)
router.delete('/:id', deleteUsuarioRol)

export default router
