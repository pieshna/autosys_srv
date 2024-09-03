import { hashString } from '../shared/components/auth/encriptar'
import { DefaultModel } from '../shared/models/postgres/defaultModel'

class UsuarioModel extends DefaultModel {
  constructor() {
    super('usuario')
  }

  async findAll() {
    const sql = `
      select 
      usuario.id,
      username,
      nombre,
      apellido,
      email,
      estado,
      (select nombre from usuario_detalle where usuario_id = 
      (coalesce(creado_por, usuario_detalle.creado_por))) as creado_por,
      (select nombre from usuario_detalle where usuario_id = 
      (coalesce(actualizado_por, usuario_detalle.actualizado_por))) as actualizado_por,
      usuario.created_at,
      usuario.updated_at
      from usuario
      left join usuario_detalle on usuario.id = usuario_detalle.usuario_id
      `
    return await super.findByQuery(sql)
  }

  async findById(id: string) {
    const sql = `
      select 
      u.id,
      u.username,
      ud.nombre,
      ud.apellido,
      u.email,
      (select nombre from usuario_detalle where usuario_id = 
      (coalesce(u.creado_por, ud.creado_por))) as creado_por,
      (select nombre from usuario_detalle where usuario_id = 
      (coalesce(u.actualizado_por, ud.actualizado_por))) as actualizado_por,
      u.created_at,
      u.updated_at
      from usuario as u
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
      FROM usuario as u
      LEFT JOIN usuario_detalle as ud ON u.id = ud.usuario_id
      LEFT JOIN usuario_direccion as udi ON u.id = udi.usuario_id
      LEFT JOIN usuario_telefono as ut ON u.id = ut.usuario_id
      WHERE u.id = $1
    `
    return await super.findByQuery(sql, [id])
  }
}

export default new UsuarioModel()
