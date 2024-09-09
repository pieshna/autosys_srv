import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createRepuesto,
  deleteRepuesto,
  getRepuesto,
  getRepuestos,
  updateRepuesto
} from './repuesto.controller'
import { repuestoSchema } from './repuesto.schema'

const router = Router()

router.get('/', getRepuestos)
router.get('/:id', getRepuesto)
router.post('/', schemaValidation(repuestoSchema), createRepuesto)
router.put('/:id', schemaValidation(repuestoSchema), updateRepuesto)
router.delete('/:id', deleteRepuesto)

export default router
