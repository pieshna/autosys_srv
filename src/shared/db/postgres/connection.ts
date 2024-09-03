import { Pool } from 'pg'
import { envToConst } from '../../envToConst'

const connection = new Pool({
  user: envToConst.DB_USER,
  host: envToConst.DB_HOST,
  database: envToConst.DB_NAME,
  password: envToConst.DB_PASSWORD,
  port: parseInt(envToConst.DB_PORT),
  max: 20,
  idleTimeoutMillis: 1000 * 30,
  connectionTimeoutMillis: 1000 * 2
})

connection.on('connect', (client) => {
  client.query(`CREATE SCHEMA IF NOT EXISTS ${envToConst.DB_SCHEMA}`)
  client.query(`SET search_path TO ${envToConst.DB_SCHEMA}`)
})

connection.on('error', (err) => {
  console.error('Error en la conexión a la base de datos', err)
})

export type connectionType = Pool

export default connection
