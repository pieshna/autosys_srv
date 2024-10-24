import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createTrabajo,
  deleteTrabajo,
  getDataForRecibo,
  getTrabajo,
  getTrabajos,
  getTrabajosDisponibles,
  getTrabajosPorSemana,
  updateProceso,
  updateTrabajo
} from './trabajo.controller'
import { trabajoSchema } from './trabajo.schema'

const router = Router()

router.get('/', getTrabajos)
router.get('/semana', getTrabajosPorSemana)
router.get('/disponibles', getTrabajosDisponibles)
router.get('/recibo/:id', getDataForRecibo)
router.get('/:id', getTrabajo)
router.post('/', schemaValidation(trabajoSchema), createTrabajo)
router.put('/', updateProceso)
router.put('/:id', schemaValidation(trabajoSchema), updateTrabajo)
router.delete('/:id', deleteTrabajo)

export default router
