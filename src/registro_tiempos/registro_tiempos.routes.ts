import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createRegistroTiempo,
  deleteRegistroTiempo,
  getRegistroTiempo,
  getRegistroTiempos,
  updateRegistroTiempo
} from './registro_tiempos.controller'
import { registroTiemposSchema } from './registro_tiempos.schema'

const router = Router()

router.get('/', getRegistroTiempos)
router.get('/:id', getRegistroTiempo)
router.post('/', schemaValidation(registroTiemposSchema), createRegistroTiempo)
router.put(
  '/:id',
  schemaValidation(registroTiemposSchema),
  updateRegistroTiempo
)
router.delete('/:id', deleteRegistroTiempo)

export default router
