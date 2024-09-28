import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente
} from './cliente.controller'
import { nuevoClienteUsuarioSchema } from './cliente.schema'

const router = Router()

router.get('/', getClientes)
router.get('/:id', getCliente)
router.post('/', schemaValidation(nuevoClienteUsuarioSchema), createCliente)
router.put('/:id', schemaValidation(nuevoClienteUsuarioSchema), updateCliente)
router.delete('/:id', deleteCliente)

export default router
