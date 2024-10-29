import { DefaultModel } from '../shared/models/postgres/defaultModel'

class TrabajadorModel extends DefaultModel {
  constructor() {
    super('trabajadores')
  }

  async findAll(): Promise<any[]> {
    const sql = `
      select 
      t.id,
      nombre,
      apellido,
      coalesce(telefono,'Sin teléfono') as telefono,
      coalesce(direccion,'Sin dirección') as direccion,
      coalesce(u.dpi,'Sin DPI') as dpi,
      especialidad,
      porcentaje,
      t.created_at,
      t.updated_at
      from trabajadores as t
      join usuarios as u on u.id = t.usuario_id
      left join usuario_detalle as ud on u.id = ud.usuario_id
    `
    return await super.findByQuery(sql)
  }

  async findById(uuid: string): Promise<any[]> {
    const sql = `
      select 
      t.usuario_id,
      t.id,
      nombre,
      apellido,
      coalesce(correo,'') as correo,
      coalesce(telefono,'') as telefono,
      coalesce(direccion,'') as direccion,
      especialidad,
      porcentaje,
      t.created_at,
      t.updated_at
      from trabajadores as t
      join usuarios as u on u.id = t.usuario_id
      left join usuario_detalle as ud on u.id = ud.usuario_id
      where t.id = $1
    `
    return await super.findByQuery(sql, [uuid])
  }

  async update(id: string, json: any): Promise<any[]> {
    const usuario = await super.findByQuery(
      'select usuario_id from trabajadores where id = $1',
      [id]
    )
    await super.findByQuery(
      'update trabajadores set especialidad = $1, porcentaje = $2 where id = $3',
      [json.especialidad ?? '', json.porcentaje, id]
    )
    return await super.findByQuery(
      'update usuarios set nombre = $1, apellido = $2 where id = $3',
      [json.nombre, json.apellido, usuario[0].usuario_id]
    )
  }
}

export default new TrabajadorModel()
