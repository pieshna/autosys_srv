import Router from 'express'
import { schemaValidation } from '../../middleware/schema'
import { navSchema } from '../../schemas/nav.schema'
import {
  agregarNav,
  editarNav,
  eliminarNav,
  listarNav,
  listarNavToNavBar,
  obtenerNav,
  obtenerNavCustom,
  obtenerNavPorRolId,
  obtenerNavPorUsuarioId,
  obtenerNavSinParentId
} from './nav.controller'

const router = Router()
const validarSchema = schemaValidation(navSchema)

router.get('/', listarNav)
router.get('/navbar', listarNavToNavBar)
router.get('/sin-parent-id', obtenerNavSinParentId)
router.get('/custom', obtenerNavCustom)
router.get('/usuario/:id', obtenerNavPorUsuarioId)
router.get('/rol/:id', obtenerNavPorRolId)
router.get('/:id', obtenerNav)
router.post('/', validarSchema, agregarNav)
router.put('/:id', validarSchema, editarNav)
router.delete('/:id', eliminarNav)

export default router
