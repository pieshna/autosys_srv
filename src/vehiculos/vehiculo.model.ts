import { DefaultModel } from '../shared/models/postgres/defaultModel'

class VehiculoModel extends DefaultModel {
  constructor() {
    super('vehiculos')
  }
}

export default new VehiculoModel()
