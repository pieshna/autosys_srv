import { DefaultModel } from '../../shared/models/postgres/defaultModel'

class UsuarioDetalleModel extends DefaultModel {
  constructor() {
    super('usuario_detalle')
  }
}

export default new UsuarioDetalleModel()
