import { DefaultModel } from '../shared/models/postgres/defaultModel'

class TrabajoRepuestoModel extends DefaultModel {
  constructor() {
    super('trabajos_repuestos')
  }

  async findAll() {
    const sql = `select tr.*,r.nombre,r.lugar,r.precio,1 as omit from trabajos_repuestos as tr
    join repuestos as r on tr.repuesto_id = r.id`
    const res = await this.findByQuery(sql)
    return res
  }

  async findById(uuid: string) {
    const sql = `select tr.*,r.nombre,r.lugar,r.precio,1 as omit from trabajos_repuestos as tr
    join repuestos as r on tr.repuesto_id = r.id
    where tr.trabajo_id = $1`
    const res = await this.findByQuery(sql, [uuid])
    return res
  }
}

export default new TrabajoRepuestoModel()
