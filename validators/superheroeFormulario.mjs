
// crea una función para agregar un error
function agregarError(errores, mensaje) {
    errores.push(mensaje);
}

// crea una función para validar un texto de nombre
function validarTextoNombre(valor, etiqueta, errores) {
    // si el valor es undefined, null o un string vacío, agrega un error
    if (valor === undefined || valor === null || String(valor).trim() === '') {
        // agrega un error
        agregarError(errores, `${etiqueta} es obligatorio`);
        // devuelve un string vacío
        return '';
    }
    // convierte el valor a un string y lo limpia
    const t = String(valor).trim();
    // si el valor es menor a 3 caracteres, agrega un error
    if (t.length < 3) {
        // agrega un error
        agregarError(errores, `${etiqueta}: al menos 3 caracteres`);
    }
    // si el valor es mayor a 60 caracteres, agrega un error
    if (t.length > 60) {
        // agrega un error
        agregarError(errores, `${etiqueta}: no puede superar 60 caracteres`);
    }
    // devuelve el valor convertido a string
    return t;
}

// crea una función para parsear una lista de texto
function parsearListaTexto(valor) {
    // si el valor es undefined, null, agrega un error
    if (valor === undefined || valor === null) {
        // devuelve un array vacío
        return [];
    }
    // convierte el valor a un string y lo divide en un array de strings
    // filtra los valores vacíos
    return String(valor)
        .split(/\r?\n|,/)
        // convierte cada string a un string y lo limpia
        .map((s) => s.trim())
        // filtra los valores vacíos
        .filter(Boolean);
}
// crea una función para validar un superhéroe

export function validarAgregarSuperheroe(body) {
    // crea un array de errores
    const errores = [];
    // valida el nombre del superhéroe

    const nombreSuperHeroe = validarTextoNombre(
        body.nombreSuperHeroe,
        'Nombre de superhéroe',
        errores,
    );
    // valida el nombre real del superhéroe
    const nombreReal = validarTextoNombre(
        body.nombreReal,
        'Nombre real',
        errores,
    );
    // valida la edad del superhéroe
    let edad;
    if (body.edad === '' || body.edad === undefined || body.edad === null) {
        // agrega un error
        agregarError(errores, 'La edad es obligatoria');
        // asigna NaN a la edad
        edad = NaN;
    } else {
        // convierte el valor a un número
        const n = Number(body.edad);
        // si el valor no es un número finito o un entero, agrega un error
        if (!Number.isFinite(n) || !Number.isInteger(n)) {
            agregarError(errores, 'La edad debe ser un número entero');
            // asigna NaN a la edad
            edad = NaN;
            // si el valor es menor a 0, agrega un error
        } else if (n < 0) {
            agregarError(errores, 'La edad no puede ser negativa');
            // asigna el valor a la edad
            edad = n;
            // si el valor es un número finito o un entero, asigna el valor a la edad
        } else {
            // asigna el valor a la edad
            edad = n;
        }
    }

    // valida el planeta de origen del superhéroe
    let planetaOrigen = body.planetaOrigen;
    // si el valor es undefined, null o un string vacío, agrega un error
    if (planetaOrigen === undefined || planetaOrigen === null || String(planetaOrigen).trim() === '') {
        // asigna 'Desconocido' al planeta de origen
        planetaOrigen = 'Desconocido';
        // si el valor no es undefined, null o un string vacío, convierte el valor a un string y lo limpia
        // asigna el valor a la planeta de origen
    } else {
        // convierte el valor a un string y lo limpia
        planetaOrigen = String(planetaOrigen).trim();
    }

    // valida la debilidad del superhéroe
    let debilidad;
    // si el valor es undefined, null o un string vacío, agrega un error
    if (body.debilidad !== undefined && body.debilidad !== null && String(body.debilidad).trim() !== '') {
        // convierte el valor a un string y lo limpia
        debilidad = String(body.debilidad).trim();
        // si el valor es mayor a 200 caracteres, agrega un error
        if (debilidad.length > 200) {
            // agrega un error
            agregarError(errores, 'Debilidad: texto demasiado largo');
        }
    }

    // valida los poderes del superhéroe
    const poderesBrutos = Array.isArray(body.poderes)
        // si el valor es un array, asigna el valor a los poderes brutos
        ? body.poderes
        : parsearListaTexto(body.poderes);
    // crea un array de poderes
    const poderes = [];
    // crea una variable para verificar si hay un poder inválido
    let poderInvalido = false;
    // recorre los poderes brutos
    for (const p of poderesBrutos) {
        // convierte el poder a un string y lo limpia
        const t = String(p).trim();
        // si el poder es menor a 3 caracteres o mayor a 60 caracteres, asigna true a la variable poderInvalido
        if (t.length < 3 || t.length > 60) {
            // asigna true a la variable poderInvalido
            poderInvalido = true;
            // si el poder es válido, agrega el poder a la lista de poderes
        } else {
            // si el poder es válido, agrega el poder a la lista de poderes
            poderes.push(t);
        }
    }
    // si hay un poder inválido, agrega un error
    if (poderInvalido) {
        // agrega un error
        agregarError(
            errores,
            'Cada poder debe tener entre 3 y 60 caracteres (revisá líneas vacías o muy cortas)',
        );
    } else if (poderes.length === 0) {
        // si no hay poderes, agrega un error
        agregarError(
            errores,
            'Debés indicar al menos un poder (uno por línea o separados por coma)',
        );
    }

    // valida los aliados del superhéroe
    const aliados = parsearListaTexto(body.aliados);
    // valida los enemigos del superhéroe
    // convierte el valor a un array de strings
    const enemigos = parsearListaTexto(body.enemigos);

    // valida el creador del superhéroe
    let creador;
    // si el valor es undefined, null o un string vacío, agrega un error
    if (body.creador !== undefined && body.creador !== null && String(body.creador).trim() !== '') {
        // convierte el valor a un string y lo limpia
        creador = String(body.creador).trim();
        // si el valor es mayor a 120 caracteres, agrega un error
        if (creador.length > 120) {
            // agrega un error
            agregarError(errores, 'Creador: texto demasiado largo');
        }
    }

    // si hay errores, devuelve un mensaje de error
    if (errores.length > 0) {
        // devuelve un mensaje de error
        return { ok: false, errores, datos: null };
    }
    // crea un objeto de datos

    const datos = {
        // asigna el nombre del superhéroe a los datos
        nombreSuperHeroe,
        // asigna el nombre real del superhéroe a los datos
        nombreReal,
        // asigna la edad del superhéroe a los datos
        edad,
        // asigna el planeta de origen del superhéroe a los datos
        planetaOrigen,
        // asigna los poderes del superhéroe a los datos
        poderes,
        // asigna los aliados del superhéroe a los datos
        aliados,
        // asigna los enemigos del superhéroe a los datos
        enemigos,
        // asigna el creador del superhéroe a los datos
        creador,
    };
    // si hay una debilidad, asigna la debilidad a los datos
    if (debilidad) {
        // asigna la debilidad a los datos
        datos.debilidad = debilidad;
    }
    // si hay aliados, asigna los aliados a los datos
    if (aliados.length > 0) {
        // asigna los aliados a los datos
        datos.aliados = aliados;
    }
    // si hay enemigos, asigna los enemigos a los datos
    if (enemigos.length > 0) {
        // asigna los enemigos a los datos
        datos.enemigos = enemigos;
    }
    // si hay creador, asigna el creador a los datos
    if (creador) {
        // asigna el creador a los datos
        datos.creador = creador;
    }
    // si no hay errores, devuelve un mensaje de error
    return { ok: true, errores: [], datos };
}
