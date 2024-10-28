import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createTrabajoRepuesto,
  deleteTrabajoRepuesto,
  getTrabajoRepuesto,
  getTrabajoRepuestos,
  updateTrabajoRepuesto
} from './trabajo_repuesto.controller'
import { trabajoRepuestoSchema } from './trabajo_repuesto.schema'

const router = Router()

router.get('/', getTrabajoRepuestos)
router.get('/:id', getTrabajoRepuesto)
router.post('/', createTrabajoRepuesto)
router.put(
  '/:id',
  schemaValidation(trabajoRepuestoSchema),
  updateTrabajoRepuesto
)
router.delete('/:id', deleteTrabajoRepuesto)

export default router
