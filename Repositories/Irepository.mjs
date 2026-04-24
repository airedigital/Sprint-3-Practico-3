class IRepository {
    // obtiene un superhéroe por su id
    obtenerPorId(id) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'obtenerPorId()' no implementado");
    }

    // obtiene todos los superhéroes
    obtenerTodos() {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'obtenerTodos()' no implementado");
    }

    // busca un superhéroe por un atributo y un valor
    buscarPorAtributo(atributo, valor) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'buscarPorAtributo()' no implementado");
    }

    // obtiene los superhéroes mayores de 30 años
    obtenerMayoresDe30() {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'obtenerMayoresDe30()' no implementado");
    }

    // busca un superhéroe por su planeta de origen
    buscarPorPlaneta(planeta) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'buscarPorPlaneta()' no implementado");
    }

    // obtiene un superhéroe por su nombre
    obtenerPorNombre(nombre) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'obtenerPorNombre()' no implementado");
    }

    // crea un nuevo superhéroe
    crear(datos) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'crear()' no implementado");
    }

    // actualiza un superhéroe por su nombre
    actualizarPorNombre(nombre, datos) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'actualizarPorNombre()' no implementado");
    }

    // actualiza un superhéroe por su id
    actualizarPorId(id, datos) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'actualizarPorId()' no implementado");
    }

    // elimina un superhéroe por su nombre
    eliminarPorNombre(nombre) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'eliminarPorNombre()' no implementado");
    }

    // elimina un superhéroe por su id
    eliminarPorId(id) {
        // si no se implementó el método, lanza un error
        throw new Error("Método 'eliminarPorId()' no implementado");
    }
}

// exporta la clase IRepository
export default IRepository;
