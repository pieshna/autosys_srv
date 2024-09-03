import { Router } from 'express'

import { schemaValidation } from '../../middleware/schema'
import { authSchemaLogin, authSchemaRegister } from '../../schemas/auth.schema'
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyTokenValid
} from './auth.controller'

const router = Router()

router.get('/verify-token-valid/:token', verifyTokenValid)

router.post('/login', schemaValidation(authSchemaLogin), login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
//router.use(authMiddleware)
router.post('/register', schemaValidation(authSchemaRegister), register)

export default router
