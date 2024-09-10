import { hashString } from '../shared/components/auth/encriptar'
import { DefaultModel } from '../shared/models/postgres/defaultModel'

class UsuarioModel extends DefaultModel {
  constructor() {
    super('usuarios')
  }

  async findAll() {
    const sql = `
      select 
      u.id,
      username,
      nombre,
      apellido,
      correo,
      u.created_at,
      u.updated_at
      from usuarios as u
      left join usuario_detalle as ud on u.id = ud.usuario_id
      `
    return await super.findByQuery(sql)
  }

  async findById(id: string) {
    const sql = `
      select 
      u.id,
      u.username,
      u.nombre,
      u.apellido,
      u.correo,
      u.created_at,
      u.updated_at
      from usuarios as u
      left join usuario_detalle as ud on u.id = ud.usuario_id
      where u.id = $1
    `
    return await super.findByQuery(sql, [id])
  }

  async newUserWithDetail(data: any) {
    const {
      username,
      password,
      nombre,
      apellido,
      email,
      estado = true,
      creado_por,
      fecha_nacimiento
    } = data
    const sql = `
    with new_user as (
      insert into usuario (username, email, password, estado, creado_por) 
      values ($1, $2, $3, $4, $5) returning id
    )
    insert into usuario_detalle (usuario_id, nombre, apellido, fecha_nacimiento, creado_por) 
    values ((select id from new_user), $6, $7, $8, $9)
    returning (select id from new_user)
    `

    const passwordCrypt = await hashString(password)

    return await super.findByQuery(sql, [
      username,
      email,
      passwordCrypt,
      estado,
      creado_por,
      nombre,
      apellido,
      fecha_nacimiento,
      creado_por
    ])
  }

  async myData(id: string) {
    const sql = `
      SELECT
      u.id,
      u.username,
      u.email,
      u.estado,
      ud.nombre,
      ud.apellido,
      ud.fecha_nacimiento,
      ud.foto,
      udi.direccion,
      ut.telefono
      FROM usuarios as u
      LEFT JOIN usuario_detalle as ud ON u.id = ud.usuario_id
      LEFT JOIN usuario_direccion as udi ON u.id = udi.usuario_id
      LEFT JOIN usuario_telefono as ut ON u.id = ut.usuario_id
      WHERE u.id = $1
    `
    return await super.findByQuery(sql, [id])
  }

  async create(json: any): Promise<any[]> {
    const { rol_id, ...rest } = json
    const res = await super.create(rest)
    const res2 = await super.findByQuery(
      `
      insert into usuario_rol (usuario_id, rol_id) values ($1, $2) returning *`,
      [res[0].id, rol_id]
    )
    return [...res, ...res2]
  }

  async update(id: string, json: any): Promise<any[]> {
    const { rol_id, ...rest } = json
    const res = await super.update(id, rest)
    const res2 = await super.findByQuery(
      `
      update usuario_rol set rol_id = $1 where usuario_id = $2 returning *`,
      [rol_id, id]
    )
    return [...res, ...res2]
  }
}

export default new UsuarioModel()
