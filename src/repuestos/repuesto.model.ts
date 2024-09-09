import { DefaultModel } from '../shared/models/postgres/defaultModel'

class RepuestoModel extends DefaultModel {
  constructor() {
    super('repuestos')
  }
}

export default new RepuestoModel()
