
// importa mongoose
import mongoose from 'mongoose';
// importa el repositorio de superhéroes
import superHeroRepository from '../Repositories/SuperheroesRepository.mjs';
// importa la función para convertir un documento a valores de formulario
import { documentoAValoresFormulario } from '../Views/responseView.mjs';
// importa la función para validar agregar superhéroe
import { validarAgregarSuperheroe } from '../validators/superheroeFormulario.mjs';

// crea una función para convertir errores de mongoose a un array de errores
function erroresDesdeMongoose(error) {
    // si el error es de validación y hay errores, devuelve los errores
    if (error.name === 'ValidationError' && error.errors) {
        return Object.values(error.errors).map((e) => e.message);
    }
    return [error.message || 'Error al guardar en la base de datos'];
}

// crea una función para verificar si un id es válido
function idValido(id) {
    // verifica si el id es válido
    return mongoose.Types.ObjectId.isValid(id);
}

/** Lista todos los documentos (para dashboard vía controlador de vistas + responseView). */
export async function listarTodosLosSuperheroes() {
    // intenta listar todos los superhéroes
    try {
        // lista todos los superhéroes
        const documentos = await superHeroRepository.obtenerTodos();
        // si hay un error, devuelve un mensaje de error
        return { ok: true, documentos };
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        return { ok: false, errores: [error.message || 'Error al leer la base de datos'] };
    }
}

/**
 * Modelo (persistencia) + reglas de negocio: crear superhéroe validado.
 * Lo usan la API (`superheroController.insertar`) y el formulario web.
 */
export async function crearSuperheroeDesdeBody(body) {
    // valida el superhéroe
    const validacion = validarAgregarSuperheroe(body);
    // si no es válido, devuelve un mensaje de error
    if (!validacion.ok) {
        // si no es válido, devuelve un mensaje de error
        return { ok: false, errores: validacion.errores };
    }
    try {
        // crea el superhéroe
        const doc = await superHeroRepository.crear(validacion.datos);
        // si hay un error, devuelve un mensaje de error
        return { ok: true, doc };
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        return { ok: false, errores: erroresDesdeMongoose(error) };
    }
}

/**
 * Actualizar por _id con las mismas reglas que el alta.
 */
export async function actualizarSuperheroePorIdDesdeBody(id, body) {
    // verifica si el id es válido
    if (!idValido(id)) {
        // si no es válido, devuelve un mensaje de error
        return { ok: false, errores: ['El identificador no es válido'] };
    }
    // verifica si el superhéroe existe
    const existe = await superHeroRepository.obtenerPorId(id);
    // si no existe, devuelve un mensaje de error
    if (!existe) {
        // si no existe, devuelve un mensaje de error
        return { ok: false, notFound: true, errores: ['Superhéroe no encontrado'] };
    }
    // valida el superhéroe
    const validacion = validarAgregarSuperheroe(body);
    // si no es válido, devuelve un mensaje de error
    if (!validacion.ok) {
        // si no es válido, devuelve un mensaje de error
        return { ok: false, errores: validacion.errores };
    }
    try {
        // actualiza el superhéroe
        const doc = await superHeroRepository.actualizarPorId(id, validacion.datos);
        // si no existe, devuelve un mensaje de error
        if (!doc) {
            // si no existe, devuelve un mensaje de error
            return { ok: false, notFound: true, errores: ['Superhéroe no encontrado'] };
        }
        // si existe, devuelve el superhéroe actualizado
        return { ok: true, doc };
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        return { ok: false, errores: erroresDesdeMongoose(error) };
    }
}

/**
 * @returns {Promise<{ ok: true, valores: object } | { ok: false, notFound?: boolean, errores?: string[] }>}
 */
export async function obtenerSuperheroeParaFormularioEdicion(id) {
    // verifica si el id es válido
    if (!idValido(id)) {
        // si no es válido, devuelve un mensaje de error
        return { ok: false, errores: ['El identificador no es válido'] };
    }
    // obtiene el superhéroe por su id
    const doc = await superHeroRepository.obtenerPorId(id);
    // si no existe, devuelve un mensaje de error
    if (!doc) {
        // si no existe, devuelve un mensaje de error
        return { ok: false, notFound: true, errores: ['Superhéroe no encontrado'] };
    }
    // si existe, devuelve el superhéroe para el formulario de edición
    return { ok: true, valores: documentoAValoresFormulario(doc) };
}

/**
 * Elimina por _id. Usa el mismo repositorio que la API (`eliminarPorId`).
 * @returns {Promise<{ ok: true, doc: object } | { ok: false, notFound?: boolean, errores: string[] }>}
 */
export async function eliminarSuperheroePorId(id) {
    // verifica si el id es válido
    if (!idValido(id)) {
        // si no es válido, devuelve un mensaje de error
        return { ok: false, errores: ['El identificador no es válido'] };
    }
    // intenta eliminar el superhéroe por su id
    try {
        // elimina el superhéroe por su id
        const borrado = await superHeroRepository.eliminarPorId(id);
        // si no existe, devuelve un mensaje de error
        if (!borrado) {
            // si no existe, devuelve un mensaje de error
            return { ok: false, notFound: true, errores: ['Superhéroe no encontrado'] };
        }
        // si existe, devuelve el superhéroe eliminado
        return { ok: true, doc: borrado };
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        return { ok: false, errores: erroresDesdeMongoose(error) };
    }
}
