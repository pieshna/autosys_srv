import { DefaultModel } from '../shared/models/postgres/defaultModel'

class VehiculoModel extends DefaultModel {
  constructor() {
    super('vehiculos')
  }
  async findAll() {
    const sql = `
    select concat(nombre,' ',apellido) as cliente, v.* from vehiculos as v
    join clientes as c on c.id = v.cliente_id
    join usuarios as u on u.id = c.usuario_id
    `
    return await this.findByQuery(sql)
  }
}

export default new VehiculoModel()
