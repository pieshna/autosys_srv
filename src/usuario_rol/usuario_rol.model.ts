import { DefaultModel } from '../shared/models/postgres/defaultModel'

class usuarioRolModel extends DefaultModel {
  constructor() {
    super('usuario_rol')
  }

  async findAll() {
    const sql = `
    SELECT ur.id, ud.nombre, ud.apellido, u.username, r.name, ur.created_at, ur.updated_at FROM usuario_rol as ur
    LEFT JOIN usuario as u ON ur.usuario_id = u.id
    LEFT JOIN rol as r ON ur.rol_id = r.id
    LEFT JOIN usuario_detalle as ud ON u.id = ud.usuario_id
    `
    return await super.findByQuery(sql)
  }

  async findUserByRol(id: string) {
    return await this.findByQuery(
      `SELECT u.id, u.username, u.email, u.status, u.created_at, u.updated_at FROM usuario as u
        LEFT JOIN usuario_rol as ur ON u.id = ur.usuario_id
        WHERE ur.rol_id = $1`,
      [id]
    )
  }

  async findRolByUser(id: string) {
    return await this.findByQuery(
      `SELECT r.id, r.name, r.created_at, r.updated_at FROM rol as r
            LEFT JOIN usuario_rol as ur ON r.id = ur.rol_id
            WHERE ur.usuario_id = $1`,
      [id]
    )
  }
}

export default new usuarioRolModel()
