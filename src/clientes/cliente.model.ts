import { DefaultModel } from '../shared/models/postgres/defaultModel'

class ClienteModel extends DefaultModel {
  constructor() {
    super('clientes')
  }

  async findAll(): Promise<any[]> {
    const sql = `
      select 
      c.id,
      nombre,
      apellido,
      coalesce(correo,'Sin correo') as correo,
      coalesce(telefono,'Sin teléfono') as telefono,
      coalesce(direccion,'Sin dirección') as direccion,
      c.created_at,
      c.updated_at
      from clientes as c
      join usuarios as u on u.id = c.usuario_id
      left join usuario_detalle as ud on u.id = ud.usuario_id
    `
    return await super.findByQuery(sql)
  }
}

export default new ClienteModel()
