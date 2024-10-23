import { DefaultModel } from '../shared/models/postgres/defaultModel'

class TrabajosModel extends DefaultModel {
  constructor() {
    super('trabajos')
  }

  async findAll() {
    const sql = `
    select concat(u.nombre,' ',u.apellido) as trabajador, concat(u2.nombre,' ',u2.apellido) as cliente, v.placa, t.* from
    trabajos as t
    join trabajadores as tr on tr.id = t.trabajador_id
    join usuarios as u on u.id = tr.usuario_id
    join vehiculos as v on v.id = t.vehiculo_id
    join clientes as c on c.id = v.cliente_id
    join usuarios as u2 on u2.id = c.usuario_id
    `
    const res = await this.findByQuery(sql)

    return res.map((r) => {
      return {
        ...r,
        fecha: r.fecha
          .toISOString()
          .split('T')[0]
          .split('-')
          .reverse()
          .join('/'),
        problema_cliente: r.problema_cliente
          ? r.problema_cliente
          : 'Sin detalle',
        problema_trabajador: r.problema_trabajador
          ? r.problema_trabajador
          : 'Sin detalle',
        diagnostico_mecanico: r.diagnostico_mecanico
          ? r.diagnostico_mecanico
          : 'Sin detalle',
        total_pagar: r.total_pagar ? r.total_pagar : 'Sin Asignar'
      }
    })
  }

  async getTrabajosPorSemana() {
    const sql = `
    select
    concat(u.nombre, ' ', u.apellido) as trabajador, 
    sum(t.total_pagar * (tr.porcentaje * 0.01)) as pago_trabajador
    from trabajos as t
    join trabajadores as tr on tr.id = t.trabajador_id
    join usuarios as u on u.id = tr.usuario_id
    where t.fecha >= now() - interval '1 month'
    group by trabajador
    order by trabajador
    `
    const sql2 = `
    with semanas as (
      select
        t.id,
        date_trunc('week', t.fecha) as semana_inicio
      from trabajos as t
      where t.fecha >= now() - interval '1 month'
    ),
    semanas_numeradas as (
      select
        semana_inicio,
        row_number() over (order by semana_inicio) as semana_consecutiva,
        extract(month from semana_inicio) as mes
      from semanas
      group by semana_inicio
    )
    select
      count(s.id) as trabajos,
      
      sn.semana_consecutiva as semana,
      sn.mes
    from semanas as s
    join semanas_numeradas as sn
    on s.semana_inicio = sn.semana_inicio
    group by sn.semana_consecutiva, sn.mes
    order by sn.semana_consecutiva
    `
    const semanas = await this.findByQuery(sql2)
    const pagos = await this.findByQuery(sql)

    const res = { semanas, pagos }

    return res
  }

  async findAllDisponibles() {
    const sql = `
    select concat(u.nombre,' ',u.apellido) as trabajador, concat(u2.nombre,' ',u2.apellido) as cliente, v.placa,
    rt.*,
    t.* 
    from
    trabajos as t
    join trabajadores as tr on tr.id = t.trabajador_id
    join usuarios as u on u.id = tr.usuario_id
    join vehiculos as v on v.id = t.vehiculo_id
    join clientes as c on c.id = v.cliente_id
    join usuarios as u2 on u2.id = c.usuario_id
    join registro_tiempos as rt on rt.trabajo_id = t.id
    where rt.hora_finalizacion is null
    `
    const res = await this.findByQuery(sql)

    return res.map((r) => {
      return {
        ...r,
        fecha: r.fecha
          .toISOString()
          .split('T')[0]
          .split('-')
          .reverse()
          .join('/'),
        problema_cliente: r.problema_cliente
          ? r.problema_cliente
          : 'Sin detalle',
        problema_trabajador: r.problema_trabajador
          ? r.problema_trabajador
          : 'Sin detalle',
        diagnostico_mecanico: r.diagnostico_mecanico
          ? r.diagnostico_mecanico
          : 'Sin detalle',
        total_pagar: r.total_pagar ? r.total_pagar : 'Sin Asignar',
        parent: r.hora_inicio ? 'En Proceso' : null
      }
    })
  }
}

export default new TrabajosModel()
