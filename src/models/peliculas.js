import { Schema, model } from "mongoose";

const peliculasSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true, 
        },
        descripcion: {
            type: String,
            required: true,
        },
        director: {
            type: String,
            required: true,
        },
        genero: {
            type: String,
            required: true,
        },
        anio: {
            type: String,
            required: true,
        },
        duracion: {
            type: String,
            required: true,
        },
        imagen: {
            type: String,
            required: false, 
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Peliculas", peliculasSchema);