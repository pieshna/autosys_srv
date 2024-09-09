import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createTrabajo,
  deleteTrabajo,
  getTrabajo,
  getTrabajos,
  updateTrabajo
} from './trabajo.controller'
import { trabajoSchema } from './trabajo.schema'

const router = Router()

router.get('/', getTrabajos)
router.get('/:id', getTrabajo)
router.post('/', schemaValidation(trabajoSchema), createTrabajo)
router.put('/:id', schemaValidation(trabajoSchema), updateTrabajo)
router.delete('/:id', deleteTrabajo)

export default router
