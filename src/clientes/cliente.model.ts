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

  async findById(id: string): Promise<any> {
    const sql = `
      select 
      c.usuario_id,
      c.id,
      nombre,
      apellido,
      coalesce(correo,'') as correo,
      coalesce(telefono,'') as telefono,
      coalesce(direccion,'') as direccion,
      c.created_at,
      c.updated_at
      from clientes as c
      join usuarios as u on u.id = c.usuario_id
      left join usuario_detalle as ud on u.id = ud.usuario_id
      where c.id = $1
    `
    return await super.findByQuery(sql, [id])
  }

  async update(id: string, data: any): Promise<any> {
    const usuario = await super.findByQuery(
      'select usuario_id from clientes where id = $1',
      [id]
    )
    return await super.findByQuery(
      'update usuarios set nombre = $1, apellido = $2, correo = $3 where id = $4',
      [data.nombre, data.apellido, data.correo ?? '', usuario[0].usuario_id]
    )
  }
}

export default new ClienteModel()
