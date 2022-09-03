import { Request, Response } from 'express'
import { Usuarios } from '../db/models/usuarios.models'
import bcrypt from 'bcrypt'
import { generarJWT } from '../helpers/generarJWT'
import { TipoDocumento } from '../db/models/tipo_documento'

export const getUsuarios = async (_req: Request, res: Response) => {
  const usuarios = await Usuarios.findAll({
    // attributes:['nombre', 'apellido'],
    where: { activo: 1 },
    include: { model: TipoDocumento }
  })
  res.json({
    usuarios
  })
}

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params

  const usuario = await Usuarios.findByPk(id)

  if (!usuario) {
    return res.status(404).json({
      msg: `No existe usuario con id ${id}`
    })
  }

  res.json({
    usuario
  })
}

export const register = async (req: Request, res: Response) => {
  const { password, ...usuario } = req.body

  try {
    //* VALIDÓ SI EL USUARIO YA ESTA EN LA BD
    const existe = await Usuarios.findByPk(usuario.documento)
    if (existe) {
      return res.json({
        msg: 'El usuario ya esta registrado'
      })
    }

    //* ENCRIPTO CONTRASEÑA
    const sal = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, sal)

    //* GUARDO EN BASE DE DATOS
    await Usuarios.create(usuario)

    res.json({
      usuario
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

export const login = async (req: Request, res: Response) => {
  const { documento, password } = req.body

  try {
    const usuario = await Usuarios.findByPk(documento)
    if (!usuario) {
      return res.status(400).json({
        msg: `No existe un usuario con documento: ${documento}`
      })
    }

    if (!bcrypt.compareSync(password, usuario?.password)) {
      return res.status(400).json({
        msg: 'Contraseña incorrecta'
      })
    }

    if (!usuario?.activo) {
      return res.status(400).json({
        msg: 'Usuario inactivo hable con el administrador'
      })
    }

    const token = await generarJWT(usuario?.documento)

    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'hable con el administrador'
    })
  }
}
