import bcrypt from 'bcryptjs';

// Almacenamiento temporal de usuarios en memoria
let usuarios = [
    {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan@unsa.edu.pe",
        password: bcrypt.hashSync("123456", 10),
        rol: "admin"
    },
    {
        id: 2,
        nombre: "María López",
        email: "maria@unsa.edu.pe",
        password: bcrypt.hashSync("123456", 10),
        rol: "user"
    }
];

// Busca un usuario registrado por su correo electrónico
async function findUserByEmail(email) {
    try {
        return usuarios.find(user => user.email === email);
    } catch (error) {
        console.error('Error al buscar el usuario por correo:', error);
        throw error;
    }
}

// Crea y guarda un nuevo usuario con rol por defecto
async function createUser(username, lastname, correo, hashedPassword) {
    try {
        const newUser = {
            id: usuarios.length + 1,
            nombre: username,
            apellido: lastname,
            email: correo,
            password: hashedPassword,
            rol: "user"
        };
        usuarios.push(newUser);
        return newUser;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
}

export default {
    findUserByEmail,
    createUser
};