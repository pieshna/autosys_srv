import { DefaultModel } from '../shared/models/postgres/defaultModel'

class TrabajoRepuestoModel extends DefaultModel {
  constructor() {
    super('trabajo_repuesto')
  }
}

export default new TrabajoRepuestoModel()
