import { DefaultModel } from '../../models/postgres/defaultModel'

class Auth extends DefaultModel {
  constructor() {
    super('usuario')
  }

  async findByFieldOnlyOne(field: string, value: string): Promise<any> {
    const result = await super.findByField(field, value)
    if (result[0]) {
      const userId = result[0].id
      const rol = await this.findByQuery(
        `SELECT r.name as nombre, rol_id FROM rol as r left join usuario_rol as ur
        on r.id = ur.rol_id where ur.usuario_id = $1`,
        [userId]
      )
      const nombre = await this.findByQuery(
        'SELECT nombre FROM usuario_detalle WHERE usuario_id = $1',
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