import { DefaultModel } from '../shared/models/postgres/defaultModel'

class TrabajosModel extends DefaultModel {
  constructor() {
    super('trabajos')
  }
}

export default new TrabajosModel()
