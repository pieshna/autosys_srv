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
  client.query('SET search_path TO edusafe')
})

export type connectionType = Pool

export default connection
