

/** Devuelve todos los superhéroes en formato JSON*/
export async function obtenerTodos(req, res) {
    // intenta obtener todos los superhéroes
    try {
        // lista todos los superhéroes
        const resultado = await superheroesService.listarTodosLosSuperheroes();
        // si hay un error, devuelve un mensaje de error
        if (!resultado.ok) {
            // si hay un error, devuelve un mensaje de error
            return res.status(500).json({
                mensaje: 'Error al obtener los superhéroes',
                errores: resultado.errores,
            });
        }
        // renderiza la lista de superhéroes
        const lista = renderizarListaSuperheroes(resultado.documentos);
        // devuelve la lista de superhéroes
        res.status(200).json(lista);
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al obtener los superhéroes',
            error: error.message,
        });
    }
}

/** Busca los superhéroes por planeta de origen*/
export async function buscarPorPlaneta(req, res) {
    // intenta buscar los superhéroes por planeta de origen
    try {
        // obtiene el planeta de origen
        const planeta = req.query.planetaOrigen || 'Tierra';
        // busca los superhéroes por planeta de origen
        const heroes = await superHeroRepository.buscarPorPlaneta(planeta);
        // devuelve la lista de superhéroes
        res.status(200).json(renderizarListaSuperheroes(heroes));
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al buscar por planeta',
            error: error.message,
        });
    }
}

/** Devuelve un superhéroe por su nombre*/
export async function obtenerPorNombre(req, res) {
    // intenta obtener un superhéroe por su nombre
    try {
        // obtiene el nombre del superhéroe
        const nombre = req.params.nombre;
        // obtiene el superhéroe por su nombre
        const hero = await superHeroRepository.obtenerPorNombre(nombre);
        // si el superhéroe no es encontrado, devuelve un mensaje de error
        if (!hero) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            return res
                .status(404)
                .json({ mensaje: 'Superhéroe no encontrado' });
        }
        // devuelve el superhéroe
        res.status(200).json(renderizarSuperheroe(hero));
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al obtener el superhéroe',
            error: error.message,
        });
    }
}

/** Crea un nuevo superhéroe*/
export async function insertar(req, res) {
    // intenta crear un nuevo superhéroe
    try {
        // crea un nuevo superhéroe desde el body
        const resultado = await superheroesService.crearSuperheroeDesdeBody(
            req.body,
        );
        // si no se pudo crear el superhéroe, devuelve un mensaje de error
        if (!resultado.ok) {
            // si no se pudo crear el superhéroe, devuelve un mensaje de error
            return res.status(400).json({
                mensaje: 'No se pudo crear el superhéroe',
                errores: resultado.errores,
            });
        }
        // devuelve el superhéroe creado
        res.status(201).json(renderizarSuperheroe(resultado.doc));
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al crear el superhéroe',
            error: error.message,
        });
    }
}

/** Actualiza un superhéroe por su nombre*/
export async function actualizar(req, res) {
    // intenta actualizar un superhéroe por su nombre
    try {
        // obtiene el nombre del superhéroe
        const nombre = req.params.nombre;
        // actualiza el superhéroe por su nombre
        const actualizado = await superHeroRepository.actualizarPorNombre(
            nombre,
            req.body,
        );
        // si el superhéroe no es encontrado, devuelve un mensaje de error
        if (!actualizado) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            return res
                .status(404)
                .json({ mensaje: 'Superhéroe no encontrado' });
        }
        // devuelve el superhéroe actualizado
        res.status(200).json(renderizarSuperheroe(actualizado));
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al actualizar el superhéroe',
            error: error.message,
        });
    }
}

/** Elimina un superhéroe por su nombre*/
export async function eliminar(req, res) {
    // intenta eliminar un superhéroe por su nombre
    try {
        // obtiene el nombre del superhéroe
        const nombre = req.params.nombre;
        // elimina el superhéroe por su nombre
        const borrado = await superHeroRepository.eliminarPorNombre(nombre);
        // si el superhéroe no es encontrado, devuelve un mensaje de error
        if (!borrado) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            return res
                .status(404)
                .json({ mensaje: 'Superhéroe no encontrado' });
        }
        // devuelve el superhéroe eliminado
        res.status(200).json(renderizarSuperheroe(borrado));
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al eliminar el superhéroe',
            error: error.message,
        });
    }
}

/** Elimina un superhéroe por su id*/
export async function eliminarPorId(req, res) {
    // intenta eliminar un superhéroe por su id
    try {
        // obtiene el id del superhéroe
        const { id } = req.params;
        const resultado = await superheroesService.eliminarSuperheroePorId(id);
        // si el superhéroe no es encontrado, devuelve un mensaje de error
        if (resultado.notFound) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            return res
                .status(404)
                .json({ mensaje: 'Superhéroe no encontrado' });
        }
        // si la solicitud es inválida, devuelve un mensaje de error
        if (!resultado.ok) {
            // si la solicitud es inválida, devuelve un mensaje de error
            return res.status(400).json({
                mensaje: 'No se pudo eliminar el superhéroe',
                errores: resultado.errores,
            });
        }
        // devuelve el superhéroe eliminado
        res.status(200).json(renderizarSuperheroe(resultado.doc));
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al eliminar el superhéroe',
            error: error.message,
        });
    }
}

/** Devuelve un superhéroe por su id*/
export async function obtenerPorId(req, res) {
    // intenta obtener un superhéroe por su id
    try {
        // obtiene el id del superhéroe
        const { id } = req.params;
        // obtiene el superhéroe por su id
        const superheroe = await superHeroRepository.obtenerPorId(id);
        // si el superhéroe no es encontrado, devuelve un mensaje de error
        if (!superheroe) {
            // si el superhéroe no es encontrado, devuelve un mensaje de error
            return res
                .status(404)
                .json({ mensaje: 'Superhéroe no encontrado' });
        }
        // devuelve el superhéroe por su id
        res.status(200).json(renderizarSuperheroe(superheroe));
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al obtener el superhéroe',
            error: error.message,
        });
    }
}

/** Busca los superhéroes por un atributo y un valor*/
export async function buscarPorAtributo(req, res) {
    // intenta buscar los superhéroes por un atributo y un valor
    try {
        // obtiene el atributo y el valor
        const { atributo, valor } = req.params;
        // busca los superhéroes por un atributo y un valor
        const superheroes = await superHeroRepository.buscarPorAtributo(
            atributo,
            valor,
        );
        // si no se encontraron superhéroes, devuelve un mensaje de error
        if (superheroes.length === 0) {
            // si no se encontraron superhéroes, devuelve un mensaje de error
            return res.status(404).json({
                mensaje: 'No se encontraron superhéroes con ese atributo',
            });
        }
        // devuelve la lista de superhéroes
        res.status(200).json(renderizarListaSuperheroes(superheroes));
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al buscar los superhéroes',
            error: error.message,
        });
    }
}

/** Devuelve los superhéroes mayores de 30 años*/
export async function obtenerMayoresDe30(req, res) {
    // intenta obtener los superhéroes mayores de 30 años
    try {
        // obtiene los superhéroes mayores de 30 años
        const superheroes = await superHeroRepository.obtenerMayoresDe30();
        // si no se encontraron superhéroes mayores de 30 años, devuelve un mensaje de error
        if (superheroes.length === 0) {
            // si no se encontraron superhéroes mayores de 30 años, devuelve un mensaje de error
            return res.status(404).json({
                mensaje: 'No se encontraron superhéroes mayores de 30 años',
            });
        }
        // devuelve la lista de superhéroes mayores de 30 años
        res.status(200).json(renderizarListaSuperheroes(superheroes));
        // si hay un error, devuelve un mensaje de error
    } catch (error) {
        // si hay un error, devuelve un mensaje de error
        res.status(500).json({
            mensaje: 'Error al obtener superhéroes mayores de 30',
            error: error.message,
        });
    }
}
