// forzar servidores DNS públicos si la red es problemática
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// importa mongoose
import mongoose from 'mongoose';
// importa la conexión a la base de datos
export async function connectDB() {
    // intenta conectar a la base de datos
try {
        await mongoose.connect("mongodb+srv://grupo-16:grupo-16@cluster0.blryo.mongodb.net/NodeMod3Cohorte5?retryWrites=true&w=majority");
        console.log('Conexión exitosa a MongoDB');
    } // si hay un error, muestra el error y sale del proceso
    catch (error) 
    { // si hay un error, muestra el error y sale del proceso
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
    // si la conexión es exitosa, muestra un mensaje de éxito
    finally {
        console.log('Conexión exitosa a MongoDB');
    }
}



