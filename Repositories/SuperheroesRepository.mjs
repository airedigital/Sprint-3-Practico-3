// importa el modelo de superhéroes
import { SuperHero } from '../models/SuperHero.js';
// importa la interfaz de repositorio
import IRepository from './Irepository.mjs';

// crea un filtro por nombre
const filtroPorNombre = (nombre) => ({
    $or: [
        { nombreSuperHeroe: { $regex: `^${nombre}$`, $options: 'i' } },
        { nombreSuperheroe: { $regex: `^${nombre}$`, $options: 'i' } },
    ],
});

// crea la clase SuperHeroRepository que extiende de IRepository
class SuperHeroRepository extends IRepository {
    // obtiene todos los superhéroes
    async obtenerTodos() {
        return SuperHero.find({});
    }

    // obtiene un superhéroe por su id
    async obtenerPorId(id) {
        return SuperHero.findById(id);
    }

    // busca un superhéroe por un atributo y un valor
    async buscarPorAtributo(atributo, valor) {
        return SuperHero.find({ [atributo]: valor });
    }

    // obtiene los superhéroes mayores de 30 años
    async obtenerMayoresDe30() {
        return SuperHero.find({ edad: { $gt: 30 } });
    }

    // busca un superhéroe por su planeta de origen
    async buscarPorPlaneta(planeta) {
        return SuperHero.find({ planetaOrigen: planeta });
    }

    // obtiene un superhéroe por su nombre
    async obtenerPorNombre(nombre) {
        return SuperHero.findOne(filtroPorNombre(nombre));
    }

    // crea un nuevo superhéroe
    async crear(datos) {
        // crea un nuevo superhéroe
        const doc = new SuperHero(datos);
        // guarda el superhéroe
        return doc.save();
    }

    // actualiza un superhéroe por su nombre
    async actualizarPorNombre(nombre, datos) {
        // actualiza el superhéroe por su nombre
        return SuperHero.findOneAndUpdate(
            filtroPorNombre(nombre),
            { $set: datos },
            { new: true, runValidators: true },
        );
    }

    // actualiza un superhéroe por su id
    async actualizarPorId(id, datos) {
        // actualiza el superhéroe por su id
        return SuperHero.findByIdAndUpdate(
            id,
            { $set: datos },
            { new: true, runValidators: true },
        );
    }

    // elimina un superhéroe por su nombre
    async eliminarPorNombre(nombre) {
        // elimina el superhéroe por su nombre
        return SuperHero.findOneAndDelete(filtroPorNombre(nombre));
    }

    // elimina un superhéroe por su id
    async eliminarPorId(id) {
        // elimina el superhéroe por su id
        return SuperHero.findByIdAndDelete(id);
    }
}

// exporta una nueva instancia de SuperHeroRepository
export default new SuperHeroRepository();
