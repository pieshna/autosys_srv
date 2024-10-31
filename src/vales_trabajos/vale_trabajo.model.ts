import { DefaultModel } from '../shared/models/postgres/defaultModel'

class ValesTrabajosModel extends DefaultModel {
  constructor() {
    super('vales_trabajos')
  }

  async findAll() {
    const sql = `select vt.*,v.cantidad, r.nombre,r.precio,r.lugar,1 as omit from vales_trabajos vt
    join vales as v on vt.vale_id = v.id
    join repuestos as r on v.repuesto_id = r.id`
    const res = await this.findByQuery(sql)
    return res
  }

  async findById(uuid: string) {
    const sql = `select vt.*,v.cantidad, r.nombre,r.precio,r.lugar, 1 as omit from vales_trabajos vt
    join vales as v on vt.vale_id = v.id
    join repuestos as r on v.repuesto_id = r.id
    where vt.trabajo_id = $1`
    const res = await this.findByQuery(sql, [uuid])
    return res
  }
}

export default new ValesTrabajosModel()
