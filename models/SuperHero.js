
import mongoose from "mongoose";


const nombreColeccion = process.env.MONGO_COLLECTION || "Grupo-16";

const textoNombre = {
    type: String,
    required: [true, "es obligatorio"],
    trim: true,
    minlength: [3, "debe tener al menos 3 caracteres"],
    maxlength: [60, "no puede superar 60 caracteres"],
};

function setEdad(v) {
    if (v === null || v === undefined) {
        return v;
    }
    if (typeof v === "string") {
        const t = v.trim();
        if (t === "") {
            return undefined;
        }
        const n = Number(t);
        return Number.isNaN(n) ? v : n;
    }
    return v;
}
const superheroSchema = new mongoose.Schema(
    {
        nombreSuperHeroe: { ...textoNombre },
        nombreReal: { ...textoNombre },
        edad: {
            type: Number,
            required: [true, "es obligatorio"],
            min: [0, "no admite edad negativa"],
            set: setEdad,
        },
        planetaOrigen: { type: String, default: "Desconocido" },
        debilidad: String,
        poderes: {
            type: [
                {
                    type: String,
                    trim: true,
                    minlength: [3, "cada poder debe tener al menos 3 caracteres"],
                    maxlength: [60, "cada poder no puede superar 60 caracteres"],
                },
            ],
            required: [true, "es obligatorio"],
            validate: [
                {
                    validator(v) {
                        return Array.isArray(v) && v.length > 0;
                    },
                    message: "debe contener al menos un elemento",
                },
                {
                    validator(v) {
                        return (
                            Array.isArray(v) &&
                            v.every((item) => typeof item === "string")
                        );
                    },
                    message: "debe ser un array de strings",
                },
            ],
        },
        aliados: [String],
        enemigos: [String],
        createdAt: { type: Date, default: Date.now },
        creador: String,
    },
    { collection: nombreColeccion },
);
export const SuperHero = mongoose.model("SuperHero", superheroSchema);