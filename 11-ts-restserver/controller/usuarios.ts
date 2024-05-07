import { Request, Response } from "express";
import Usuario from '../models/usuario';
import { json } from "sequelize";

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({
        usuarios
    })
}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        res.status(404).json({
            msg: `No existe un usuario con el ID ${id}`
        })
    }
    res.json({
        msg: 'getUsuario',
        usuario,
        id
    })
}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    const existeEmail = await Usuario.findOne({
        where: {
            email: body.email
        }
    })

    if (existeEmail) {
        return res.status(400).json({
            msg: `Ya existe un usuario registrado con el email ${body.email}`
        })
    }

    try {
        const usuario = new Usuario(body);
        await usuario.save();
        res.json(usuario)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {

    // const existeEmail = await Usuario.findOne({
    //     where: {
    //         email: body.email
    //     }
    // })

    const usuario = await Usuario.findByPk(id)


    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: `No es posible editar el correo del usuario desde esta seccion`
    //     })
    // }
    if (!usuario) {
        return res.status(400).json({
            msg: `No existe usuario con el id ${id}`
        })
    }

        await usuario.update(body);
        res.json(usuario)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk(id)
    if(!usuario){
        return res.json(500).json({
            msg: `No existe un susuario con el id ${id}`
        })
    }
    // ELiminacion fisica 
    // await usuario.destroy();

    await usuario.update({estado: false})

    res.json({
        msg: 'Usuario eliminado',
        id
    })
}

