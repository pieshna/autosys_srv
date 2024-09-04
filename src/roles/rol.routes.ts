import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createRol,
  deleteRol,
  getRol,
  getRoles,
  updateRol
} from './rol.controller'
import { rolSchema } from './rol.schema'

const router = Router()

router.get('/', getRoles)
router.get('/:id', getRol)
router.post('/', schemaValidation(rolSchema), createRol)
router.put('/:id', schemaValidation(rolSchema), updateRol)
router.delete('/:id', deleteRol)

export default router
