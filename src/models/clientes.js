/* 
    Campos:
        nombre
        correo
        contraseña
        telefono
        direccion
        DUI
*/

import {Schema, model} from "mongoose";

const clientesSchema = new Schema(
    {
        nombre: {
            type: String,
            require: true,
        },
        correo: {
            type: String,
            require: true,
        },
        contrasenia: {
            type: String,
            require: true,
        },
        telefono: {
            type: String,
            require: true,
        },
        direccion: {
            type: String,
            require: true,
        },
        DUI: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Clientes",clientesSchema);