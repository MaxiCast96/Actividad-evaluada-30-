/* 
    Campos:
       titulo
       descripcion
       director
       genero
       anio
       durcion
       imagen
*/

import { Schema, model } from "mongoose";

const peliculasSchema = new Schema(
    {
        titulo: {
            type: String,
            require: true,
        },
        descripcion: {
            type: String,
            require: true,
        },
        director: {
            type: String,
            require: true,
        },
        genero: {
            type: String,
            require: true,
        },
        anio: {
            type: String,
            require: true,
        },
        duracion:{
            type: String,
            require: true,
        },
        imagen:{
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Peliculas", peliculasSchema);