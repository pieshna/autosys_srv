import { Request, Response } from 'express'
import { asyncHandler } from '../../middleware/contollers'
import { uuidToBin, validarUUID } from '../../tools/uuidTools'
import { handleDataAndResponse } from '../../tools/validateDataToResponse'
import navModel from './nav.model'
import { convertToNavbarStructure } from './utilsnavbar'

export const listarNavToNavBar = asyncHandler(
  async (req: Request, res: Response) => {
    const nav = await navModel.findAll()
    const data = convertToNavbarStructure(nav)
    handleDataAndResponse(res, data)
  }
)

export const listarNav = asyncHandler(async (req: Request, res: Response) => {
  const nav = await navModel.findAll()
  handleDataAndResponse(res, nav)
})

export const obtenerNavSinParentId = asyncHandler(
  async (req: Request, res: Response) => {
    const nav = await navModel.findByFieldIsNull('parent_id')
    handleDataAndResponse(res, nav)
  }
)

export const obtenerNav = asyncHandler(async (req: Request, res: Response) => {
  const id = validarUUID(req)
  const nav = await navModel.findByUUID(id)
  handleDataAndResponse(res, nav)
})

export const obtenerNavCustom = asyncHandler(
  async (req: Request, res: Response) => {
    const nav = await navModel.findAllCustom()
    handleDataAndResponse(res, nav)
  }
)

export const obtenerNavPorUsuarioId = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const nav = await navModel.findByUsuarioId(id)
    const data = convertToNavbarStructure(nav)
    handleDataAndResponse(res, data)
  }
)

export const obtenerNavPorRolId = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const nav = await navModel.findByRolId(id)
    const data = convertToNavbarStructure(nav)
    handleDataAndResponse(res, data)
  }
)

export const agregarNav = asyncHandler(async (req: Request, res: Response) => {
  if (req.body.parent_id) {
    req.body.parent_id = uuidToBin(req.body.parent_id)
  }
  const nav = await navModel.create(req.body)
  handleDataAndResponse(res, nav)
})

export const editarNav = asyncHandler(async (req: Request, res: Response) => {
  const id = validarUUID(req)
  if (req.body.parent_id && req.body.parent_id !== '') {
    req.body.parent_id = uuidToBin(req.body.parent_id)
  } else {
    req.body.parent_id = null
  }

  const nav = await navModel.update(id, req.body)
  handleDataAndResponse(res, nav)
})

export const eliminarNav = asyncHandler(async (req: Request, res: Response) => {
  const id = validarUUID(req)
  const nav = await navModel.delete(id)
  handleDataAndResponse(res, nav)
})
