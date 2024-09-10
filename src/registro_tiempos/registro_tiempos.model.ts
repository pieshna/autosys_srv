import { DefaultModel } from '../shared/models/postgres/defaultModel'

class RegistroTiemposModel extends DefaultModel {
  constructor() {
    super('registro_tiempos')
  }
}

export default new RegistroTiemposModel()
