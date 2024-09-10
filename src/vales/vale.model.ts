import { DefaultModel } from '../shared/models/postgres/defaultModel'

class ValeModel extends DefaultModel {
  constructor() {
    super('vales')
  }
}

export default new ValeModel()
