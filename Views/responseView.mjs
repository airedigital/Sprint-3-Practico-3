/** Renderiza un superhéroe en formato HTML */
export function renderizarSuperheroe(superheroe) {
    // crea un objeto de salida
    const out = {
        // asigna el nombre del superhéroe a la salida
        Nombre: superheroe.nombreSuperHeroe,
        // asigna el nombre real del superhéroe a la salida
        'Nombre Real': superheroe.nombreReal,
        // asigna la edad del superhéroe a la salida
        Edad: superheroe.edad,
        // asigna el planeta de origen del superhéroe a la salida
        'Planeta de Origen': superheroe.planetaOrigen,
        // asigna la debilidad del superhéroe a la salida
        Debilidad: superheroe.debilidad,
        // asigna los poderes del superhéroe a la salida
        Poderes: superheroe.poderes,
        // asigna los aliados del superhéroe a la salida
        Aliados: superheroe.aliados,
        // asigna los enemigos del superhéroe a la salida
        Enemigos: superheroe.enemigos,
        // asigna el creador del superhéroe a la salida
        Creador: superheroe.creador,
    };
    // si el id del superhéroe no es null, asigna el id a la salida
    if (superheroe._id != null) {
        // asigna el id a la salida
        out._id = String(superheroe._id);
    }
    // si la fecha de creación del superhéroe no es null, asigna la fecha de creación a la salida
    if (superheroe.createdAt != null) {
        // asigna la fecha de creación a la salida
        out.createdAt = superheroe.createdAt;
    }
    // devuelve la salida
    return out;
}
/** Renderiza una lista de superhéroes en formato HTML */
export function renderizarListaSuperheroes(superheroes) {
    // crea un array de superhéroes
    return superheroes.map((superheroe) => renderizarSuperheroe(superheroe));
}

/** Convierte un documento Mongoose o plano en valores para formularios EJS (Vista). */
export function documentoAValoresFormulario(doc) {
    // si el documento no es null, convierte el documento a un objeto
    if (!doc) {
        // devuelve un objeto vacío
        return {};
    }
    // convierte el documento a un objeto
    const o = doc.toObject ? doc.toObject() : doc;
    // crea una función para convertir un array a un string
    const lineas = (arr) =>
        // si el array no es null y tiene elementos, convierte el array a un string
        Array.isArray(arr) && arr.length > 0 ? arr.join('\n') : '';
    // crea un objeto de salida
    return {
        // asigna el nombre del superhéroe a la salida
        nombreSuperHeroe: o.nombreSuperHeroe ?? '',
        // asigna el nombre real del superhéroe a la salida
        nombreReal: o.nombreReal ?? '',
        // asigna la edad del superhéroe a la salida
        edad: o.edad != null ? o.edad : '',
        // asigna el planeta de origen del superhéroe a la salida
        planetaOrigen: o.planetaOrigen ?? '',
        // asigna la debilidad del superhéroe a la salida
        debilidad: o.debilidad ?? '',
        // asigna los poderes del superhéroe a la salida
        poderes: lineas(o.poderes),
        // asigna los aliados del superhéroe a la salida
        aliados: lineas(o.aliados),
        // asigna los enemigos del superhéroe a la salida
        enemigos: lineas(o.enemigos),
        // asigna el creador del superhéroe a la salida
        creador: o.creador ?? '',
    };
}