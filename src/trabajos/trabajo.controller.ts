import { Request, Response } from 'express'
import registro_tiemposModel from '../registro_tiempos/registro_tiempos.model'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import TrabajoModel from './trabajo.model'

export const getTrabajos = asyncHandler(async (req: Request, res: Response) => {
  const trabajos = await TrabajoModel.findAll()
  handleDataAndResponse(res, trabajos)
})

export const getTrabajo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const trabajo: any = await TrabajoModel.findById(id)
  trabajo[0].fecha = trabajo[0].fecha.toISOString().split('T')[0]
  handleDataAndResponse(res, trabajo)
})

export const createTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const trabajo = await TrabajoModel.create(req.body)
    await registro_tiemposModel.create({
      trabajo_id: trabajo[0].id,
      hora_ingreso: new Date()
    })
    handleDataAndResponse(res, trabajo)
  }
)

export const updateTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const trabajo = await TrabajoModel.update(id, req.body)
    handleDataAndResponse(res, trabajo)
  }
)

export const deleteTrabajo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const trabajo = await TrabajoModel.delete(id)
    handleDataAndResponse(res, trabajo)
  }
)
export const getTrabajosPorSemana = asyncHandler(
  async (req: Request, res: Response) => {
    const trabajos = await TrabajoModel.getTrabajosPorSemana()
    handleDataAndResponse(res, trabajos)
  }
)

export const getTrabajosDisponibles = asyncHandler(
  async (req: Request, res: Response) => {
    const trabajos = await TrabajoModel.findAllDisponibles()
    handleDataAndResponse(res, trabajos)
  }
)

export const updateProceso = asyncHandler(
  async (req: Request, res: Response) => {
    const resTerminado: any[] = []
    req.body.map(async (t: any) => {
      const id = await registro_tiemposModel.findByField('trabajo_id', t.id)
      if (t.parent === 'En Proceso') {
        await registro_tiemposModel.update(id[0].id, {
          hora_inicio: new Date()
        })
      } else if (t.parent === 'Terminado') {
        const res = await registro_tiemposModel.update(id[0].id, {
          hora_finalizacion: new Date()
        })
        resTerminado.push(res)
      }
    })
    handleDataAndResponse(res, resTerminado)
  }
)

export const getDataForRecibo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const trabajo = await TrabajoModel.getDataForRecibo(id)
    handleDataAndResponse(res, trabajo)
  }
)
