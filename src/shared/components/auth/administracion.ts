import { DefaultModel } from '../../models/postgres/defaultModel'

class Administracion extends DefaultModel {
  constructor() {
    super('administracion')
  }

  getTiempoToken() {
    // eslint-disable-next-line quotes
    const sql = "SELECT tiempo FROM administracion WHERE nombre like '%sesion%'"
    const datos = this.findByQuery(sql)
      .then((res) => {
        return res[0].tiempo
      })
      .catch(() => {
        return 36000
      })
    return datos
  }
}

export default new Administracion()
