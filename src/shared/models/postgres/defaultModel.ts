/* eslint-disable no-prototype-builtins */
import connection, { connectionType } from '../../db/postgres/connection'
import { addCreatedAt, addUpdatedAt } from '../../tools/datesTools'

export class DefaultModel {
  private connection: connectionType
  constructor(private readonly table: string) {
    this.connection = connection
  }

  private async query(sql: string, params?: any[]) {
    try {
      const { rows } = await this.connection.query(sql, params)
      return rows
    } catch (e: any) {
      //console.log(e)
      throw new Error(e)
    }
  }

  /**
   * Funcion para obtener todos los registros de la tabla
   * @param tabla string (opcional)
   * @returns array de objetos
   */
  async findAll(tabla?: string) {
    return this.query(`SELECT * FROM ${tabla ?? this.table}`)
  }

  /**
   * Funcion para obtener un registro por su id
   * @param uuid string
   * @returns retorna un objeto con el registro encontrado
   */
  async findById(uuid: string) {
    return this.query(`SELECT * FROM ${this.table} WHERE id = $1`, [uuid])
  }

  /**
   * Funcion para obtener un registro por su id custom
   * @param idName string
   * @param id uuid
   * @returns array | object
   */
  async findByIDCustom(idName: string, id: string) {
    return this.query(`SELECT * FROM ${this.table} WHERE ${idName} = $1 `, [id])
  }

  /**
   * Funcion para crear un registro
   * @param json object
   * @returns objeto con el registro creado
   */
  async create(json: any) {
    const data = addCreatedAt(json)
    const keys = Object.keys(data)
    const values = Object.values(data)

    const sql = `INSERT INTO ${this.table} (${keys.join(',')}) VALUES (${keys
      .map((_, i) => `$${i + 1}`)
      .join(',')}) RETURNING *`
    return this.query(sql, values)
  }

  /**
   * Funcion para crear multiples registros en una tabla
   * @param data array de objetos
   * @param table tabla a la que se le insertaran los registros (opcional)
   * @param ids ids de los registros a insertar (opcional)
   * @returns array de objetos
   */
  async createMany(
    data: any[],
    table = this.table,
    whoCreates?: string,
    ids?: string[]
  ) {
    const conCreatedAt = data.map((item) => {
      if (whoCreates) {
        item['creado_por'] = whoCreates
      }
      return addCreatedAt(item)
    })
    const columns = Object.keys(conCreatedAt[0])

    const values = conCreatedAt.flatMap((item) =>
      columns.map((column) => {
        if (ids?.includes(column)) return item[column]
        else if (!ids) return item[column]
      })
    )

    const placeholders = conCreatedAt
      .map(
        (_, rowIndex) =>
          `(${columns
            .map(
              (_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`
            )
            .join(', ')})`
      )
      .join(', ')

    const sql = `INSERT INTO ${table} (${columns.join(
      ', '
    )}) VALUES ${placeholders}
    RETURNING *`

    return this.query(sql, values)
  }

  /**
   * Funcion para actualizar un registro por su id
   * @param id string
   * @param json object
   * @returns objeto con el registro actualizado
   */
  async update(id: string, json: any) {
    const data = addUpdatedAt(json)
    const keys = Object.keys(data)
    const values = Object.values(data)

    const set = keys.map((key, i) => `${key} = $${i + 1}`).join(', ')

    const sql = `UPDATE ${this.table} SET ${set} WHERE id = $${
      keys.length + 1
    } RETURNING *`
    return this.query(sql, [...values, id])
  }

  /**
   * Funcion para eliminar un registro por su id
   * @param id string
   * @returns objeto con el registro eliminado
   */
  async delete(id: string) {
    return this.query(`DELETE FROM ${this.table} WHERE id = $1 RETURNING *`, [
      id
    ])
  }

  /**
   * Funcion para obtener el total de registros en una tabla
   * @returns number
   */
  async countAll() {
    return this.query(`SELECT COUNT(*) AS total FROM ${this.table}`)
  }

  /**
   * Funcion para obtener el total de registros en una tabla por un campo
   * @param field string
   * @param value string
   * @returns number
   */
  async countByField(field: string, value: string) {
    return this.query(
      `SELECT COUNT(*) as total FROM ${this.table} WHERE ${field} = $1`,
      [value]
    )
  }

  /**
   * Funcion para obtener un registro por un campo
   * @param field string
   * @param value string
   * @returns array de objetos
   */
  async findByField(field: string, value: string) {
    return this.query(`SELECT * FROM ${this.table} WHERE ${field} = $1`, [
      value
    ])
  }

  async findByFieldIsNull(field: string) {
    return this.query(`SELECT * FROM ${this.table} WHERE ${field} IS NULL`)
  }

  /**
   * Funcion para ejecutar una query
   * @param sql string
   * @param params array
   * @returns array de objetos
   */
  async findByQuery(sql: string, params?: any[]) {
    return (await this.query(sql, params))?.reverse()
  }

  /**
   * Funcion para obtener la conexion
   * @returns Connection
   */
  getConnection() {
    return this.connection
  }
}
