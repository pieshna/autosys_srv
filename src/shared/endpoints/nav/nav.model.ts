import { DefaultModel } from '../../models/postgres/defaultModel'

class NavModel extends DefaultModel {
  constructor() {
    super('navbar')
  }

  async findAll() {
    const result = await this.findAllCustomPS()

    result.map((item: any) => {
      delete item.parent_title
    })

    return result
  }
  async findAllCustom() {
    const sql = `
    WITH RECURSIVE navbarWithParentTitle AS (
      SELECT
          n.id,
          n.title,
          n.link,
          n.icon,
          n.parent_id,
          CAST('' AS CHAR(255)) AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      WHERE
          n.parent_id IS NULL
      UNION ALL
      SELECT
          n.id,
          n.title,
          concat(nwp.link,n.link) as link,
          n.icon,
          n.parent_id,
          nwp.title AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      INNER JOIN navbarWithParentTitle nwp ON
          n.parent_id = nwp.id
  )
  SELECT nwp.id AS id,
      nwp.title,
      nwp.link,
      nwp.icon,
      nwp.parent_id AS parent_id,
      nwp.parent_title,
      nwp.created_at,
      nwp.updated_at
  FROM
      navbarWithParentTitle nwp;
    `
    const result = await super.findByQuery(sql)

    return result
  }

  async findAllCustomPS() {
    const sql = `
    WITH RECURSIVE navbarWithParentTitle AS (
      SELECT
          n.id,
          n.title,
          CAST(n.link AS VARCHAR(255)) as link,
          n.icon,
          n.parent_id,
          CAST(n.title AS VARCHAR(255)) AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      WHERE
          n.parent_id IS NULL
      UNION ALL
      SELECT
          n.id,
          n.title,
          CAST(nwp.link || n.link AS VARCHAR(255)) as link,
          n.icon,
          n.parent_id,
          CAST(nwp.title AS VARCHAR(255)) AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      INNER JOIN navbarWithParentTitle nwp ON
          n.parent_id = nwp.id
  )
  SELECT nwp.id AS id,
      nwp.title,
      nwp.link,
      nwp.icon,
      nwp.parent_id AS parent_id,
      nwp.parent_title,
      nwp.created_at,
      nwp.updated_at
  FROM
      navbarWithParentTitle nwp;
    `
    const result = await super.findByQuery(sql)

    return result
  }
  async findByUUID(uuid: string): Promise<any> {
    const result = await super.findById(uuid)
    delete result[0].id
    return result
  }

  async findByUsuarioId(usuarioId: string) {
    const sql = `
    WITH RECURSIVE navbarWithParentTitle AS (
      SELECT
          n.id,
          n.title,
          CAST(n.link AS VARCHAR(255)) as link,
          n.icon,
          n.parent_id,
          CAST(n.title AS VARCHAR(255)) AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      WHERE
          n.parent_id IS NULL
      UNION ALL
      SELECT
          n.id,
          n.title,
          CAST(nwp.link || n.link AS VARCHAR(255)) as link,
          n.icon,
          n.parent_id,
          CAST(nwp.title AS VARCHAR(255)) AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      INNER JOIN navbarWithParentTitle nwp ON
          n.parent_id = nwp.id
  )
  SELECT nwp.id AS id,
      nwp.title,
      nwp.link,
      nwp.icon,
      nwp.parent_id AS parent_id,
      nwp.parent_title,
      nwp.created_at,
      nwp.updated_at
  FROM
      navbarWithParentTitle nwp
      JOIN usuario_navbar un ON nwp.id = un.navbar_id
      WHERE un.usuario_id = $1
    `
    const result = await super.findByQuery(sql, [usuarioId])

    return result
  }

  async findByRolId(rolId: string) {
    const sql = `
    WITH RECURSIVE navbarWithParentTitle AS (
      SELECT
          n.id,
          n.title,
          CAST(n.link AS VARCHAR(255)) as link,
          n.icon,
          n.parent_id,
          CAST(n.title AS VARCHAR(255)) AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      WHERE
          n.parent_id IS NULL
      UNION ALL
      SELECT
          n.id,
          n.title,
          CAST(nwp.link || n.link AS VARCHAR(255)) as link,
          n.icon,
          n.parent_id,
          CAST(nwp.title AS VARCHAR(255)) AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      INNER JOIN navbarWithParentTitle nwp ON
          n.parent_id = nwp.id
  )
  SELECT nwp.id AS id,
      nwp.title,
      nwp.link,
      nwp.icon,
      nwp.parent_id AS parent_id,
      nwp.parent_title,
      nwp.created_at,
      nwp.updated_at
  FROM
      navbarWithParentTitle nwp
      JOIN rol_navbar rn ON nwp.id = rn.navbar_id
      WHERE rn.rol_id = $1
    `
    const result = await super.findByQuery(sql, [rolId])

    return result
  }
}

export default new NavModel()
