import { DefaultModel } from '../shared/models/postgres/defaultModel'

class TrabajadorModel extends DefaultModel {
  constructor() {
    super('trabajadores')
  }
}

export default new TrabajadorModel()
