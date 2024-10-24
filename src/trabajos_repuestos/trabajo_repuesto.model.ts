import { DefaultModel } from '../shared/models/postgres/defaultModel'

class TrabajoRepuestoModel extends DefaultModel {
  constructor() {
    super('trabajos_repuestos')
  }
}

export default new TrabajoRepuestoModel()
