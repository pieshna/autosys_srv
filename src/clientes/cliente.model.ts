import { DefaultModel } from '../shared/models/postgres/defaultModel'

class ClienteModel extends DefaultModel {
  constructor() {
    super('clientes')
  }
}

export default new ClienteModel()
