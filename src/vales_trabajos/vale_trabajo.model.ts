import { DefaultModel } from '../shared/models/postgres/defaultModel'

class ValesTrabajosModel extends DefaultModel {
  constructor() {
    super('vales_trabajos')
  }
}

export default new ValesTrabajosModel()
