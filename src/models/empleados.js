/* 
    Campos:
        nombre
        correo
        contraseña
        telefono
        direccion
        puesto
        fecha_contratacion
        salario
        DUI
*/

import { Schema, model } from "mongoose";

const empleadoSchema = new Schema(
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

        },
        direccion: {
            type: String,
            require: true,
        },
        puesto: {
            type: String,
            require: true,
        },
        fecha_contratacion: {
            type: Date,
            require: true,
        },
        salario:{
            type: Number,
            require: true,
        },
        DUI:{
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Empleados", empleadoSchema);