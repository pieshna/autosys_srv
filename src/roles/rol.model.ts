import { DefaultModel } from '../shared/models/postgres/defaultModel'

class RolModel extends DefaultModel {
  constructor() {
    super('roles')
  }
}

export default new RolModel()
