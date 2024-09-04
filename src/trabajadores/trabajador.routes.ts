import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createTrabajador,
  deleteTrabajador,
  getTrabajador,
  getTrabajadores,
  updateTrabajador
} from './trabajador.controller'
import { trabajadorSchema } from './trabajador.schema'

const router = Router()

router.get('/', getTrabajadores)
router.get('/:id', getTrabajador)
router.post('/', schemaValidation(trabajadorSchema), createTrabajador)
router.put('/:id', schemaValidation(trabajadorSchema), updateTrabajador)
router.delete('/:id', deleteTrabajador)

export default router
