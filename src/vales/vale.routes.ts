import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createVale,
  deleteVale,
  getVale,
  getVales,
  updateVale
} from './vale.controller'
import { valeSchema } from './vale.schema'

const router = Router()

router.get('/', getVales)
router.get('/:id', getVale)
router.post('/', schemaValidation(valeSchema), createVale)
router.put('/:id', schemaValidation(valeSchema), updateVale)
router.delete('/:id', deleteVale)

export default router
