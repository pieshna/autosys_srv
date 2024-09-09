import express from 'express'
// rutas esenciales en shared folder
import adminRoutes from './shared/endpoints/admin/admin.routes'
import authRoutes from './shared/endpoints/auth/auth.routes'
import navRoutes from './shared/endpoints/nav/nav.routes'
import { authMiddleware } from './shared/middleware/auth'
// Endpoints del proyecto
import clienteRoutes from './clientes/cliente.routes'
import repuestoRoutes from './repuestos/repuesto.routes'
import rolRoutes from './roles/rol.routes'
import trabajadorRoutes from './trabajadores/trabajador.routes'
import trabajoRoutes from './trabajos/trabajo.routes'
import usuarioRoutes from './usuario/usuario.routes'
import usuarioRolRoutes from './usuario_rol/usuario_rol.routes'
import usuarioDetalleRoutes from './usuarios_detalle/usuario_detalle.routes'
import vehiculoRoutes from './vehiculos/vehiculo.routes'

const router = express.Router()

// Endpoint para probar el servidor
router.get('/', async (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' })
})

// Endponts para la autenticacion (dentro lleva authMiddleware)
router.use('/auth', authRoutes)
// Midlweware para validar que el usuario este autenticado
router.use(authMiddleware)

// Endpoints de carpeta shared
router.use('/nav', navRoutes)
router.use('/administracion', adminRoutes)
// Endpoints del proyecto
router.use('/usuarios', usuarioRoutes)
router.use('/usuarios_detalle', usuarioDetalleRoutes)
router.use('/usuario_rol', usuarioRolRoutes)
router.use('/roles', rolRoutes)
router.use('/trabajadores', trabajadorRoutes)
router.use('/clientes', clienteRoutes)
router.use('/vehiculos', vehiculoRoutes)
router.use('/repuestos', repuestoRoutes)
router.use('/trabajos', trabajoRoutes)

export default router
