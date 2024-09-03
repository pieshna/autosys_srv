import { DefaultModel } from '../../models/postgres/defaultModel'

class AdministracionModel extends DefaultModel {
  constructor() {
    super('administracion')
  }
}

export default new AdministracionModel()
