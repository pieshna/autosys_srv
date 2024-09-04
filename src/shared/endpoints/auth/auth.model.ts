import { DefaultModel } from '../../models/postgres/defaultModel'

class Auth extends DefaultModel {
  constructor() {
    super('usuarios')
  }

  async findByFieldOnlyOne(field: string, value: string): Promise<any> {
    const result = await super.findByField(field, value)
    if (result[0]) {
      const userId = result[0].id
      const rol = await this.findByQuery(
        `SELECT r.nombre, rol_id FROM roles as r left join usuario_rol as ur
        on r.id = ur.rol_id where ur.usuario_id = $1`,
        [userId]
      )
      const nombre = await this.findByQuery(
        `SELECT nombre FROM usuario_detalle as ud left join usuarios as u 
        on ud.usuario_id = u.id
        WHERE usuario_id = $1`,
        [userId]
      )
      result[0].usuario_id = result[0].id
      result[0].nombre = nombre[0]?.nombre
      result[0].rol_id = rol[0]?.rol_id
      result[0].rol = rol[0]?.nombre
    }
    return result[0]
  }
}

export default new Auth()
