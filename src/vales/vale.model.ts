import { DefaultModel } from '../shared/models/postgres/defaultModel'

class ValeModel extends DefaultModel {
  constructor() {
    super('vales')
  }

  async findAll() {
    const sql = `
      select r.nombre as repuesto, v.* from vales as v
      left join repuestos as r on r.id = v.repuesto_id
    `
    return await this.findByQuery(sql)
  }
}

export default new ValeModel()
