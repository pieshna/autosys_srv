import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createValeTrabajo,
  deleteValeTrabajo,
  getValeTrabajo,
  getValesTrabajos,
  updateValeTrabajo
} from './vale_trabajo.controller'
import { valeTrabajoSchema } from './vale_trabajo.schema'

const router = Router()

router.get('/', getValesTrabajos)
router.get('/:id', getValeTrabajo)
router.post('/', createValeTrabajo)
router.put('/:id', schemaValidation(valeTrabajoSchema), updateValeTrabajo)
router.delete('/:id', deleteValeTrabajo)

export default router
