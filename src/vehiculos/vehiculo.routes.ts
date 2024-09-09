import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createVehiculo,
  deleteVehiculo,
  getVehiculo,
  getVehiculos,
  updateVehiculo
} from './vehiculo.controller'
import { vehiculoSchema } from './vehiculo.schema'

const router = Router()

router.get('/', getVehiculos)
router.get('/:id', getVehiculo)
router.post('/', schemaValidation(vehiculoSchema), createVehiculo)
router.put('/:id', schemaValidation(vehiculoSchema), updateVehiculo)
router.delete('/:id', deleteVehiculo)

export default router
