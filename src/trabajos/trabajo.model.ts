import { DefaultModel } from '../shared/models/postgres/defaultModel'

interface datosRecibo {
  nombre: string
  fecha?: string
  productos: {
    nombre: string
    cantidad: number
    precio: number
  }[]
}

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
    coalesce(sum(t.total_pagar * (tr.porcentaje * 0.01)),0.00) as pago_trabajador
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

  async getDataForRecibo(uuidTrabajo: string) {
    const sql = `
    select
    concat( u.nombre, ' ', u.apellido ) as cliente,
    ve.placa,
    ve.modelo,
    ve.marca,
    t.descripcion,
    t.diagnostico_mecanico,
    t.total_pagar,
    t.fecha
    from trabajos as t
    join vehiculos as ve on ve.id = t.vehiculo_id
    join clientes as c on c.id = ve.cliente_id
    join usuarios as u on u.id = c.usuario_id
    where t.id = $1
    `
    const res = await this.findByQuery(sql, [uuidTrabajo])

    const sqlVales = `
    select
    r.nombre as repuesto,
    tr.cantidad as cantidad_repuesto,
    r.precio as precio_repuesto
    from trabajos_repuestos as tr
    join repuestos as r on r.id = tr.repuesto_id
    where tr.trabajo_id = $1
    `
    const vales = await this.findByQuery(sqlVales, [uuidTrabajo])

    const sqlValesVale = `
    select
    r.nombre as repuesto_vale,
    v.cantidad as cantidad_repuesto_vale,
    v.precio as precio_repuesto_vale
    from vales_trabajos as tv
    join vales as v on v.id = tv.vale_id
    join repuestos as r on r.id = v.repuesto_id
    where tv.trabajo_id = $1
    `
    const valesVale = await this.findByQuery(sqlValesVale, [uuidTrabajo])

    const resVales = [...vales, ...valesVale, ...res]

    //parse res to datosRecibo
    const result = {
      nombre: res[0].cliente,
      marca: res[0].marca,
      modelo: res[0].modelo,
      placa: res[0].placa,
      fecha: res[0].fecha
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/'),
      productos: resVales.map((r) => {
        return {
          nombre:
            r.diagnotico_mecanico ??
            r.descripcion ??
            r.repuesto ??
            r.repuesto_vale + ' (Vale)',
          cantidad: r.cantidad_repuesto ?? r.cantidad_repuesto_vale ?? 1,
          precio: r.precio_repuesto ?? r.precio_repuesto_vale ?? r.total_pagar
        }
      })
    }
    return result
  }
}

export default new TrabajosModel()
