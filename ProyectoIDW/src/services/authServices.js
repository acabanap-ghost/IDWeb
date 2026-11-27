import userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';

// Registra un nuevo usuario validando que el correo no exista y encriptando la contraseña
async function registerService(username, lastname, correo, password) {
    try {
        const existingUser = await userRepository.findUserByEmail(correo);
        if (existingUser) {
            throw new Error('El correo ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.createUser(username, lastname, correo, hashedPassword);
        const { password: _, ...userSinPassword } = user;
        return userSinPassword;
    } catch (error) {
        console.error('Error en registerService:', error);
        throw error;
    }
}

// Verifica credenciales y devuelve los datos del usuario sin su contraseña
async function loginService(correo, password) {
    try {
        const user = await userRepository.findUserByEmail(correo);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        const { password: _, ...userSinPassword } = user;
        return userSinPassword;
    } catch (error) {
        console.error('Error en loginService:', error);
        throw error;
    }
}

// Obtiene el usuario almacenado en la sesión actual
async function getUser(session) {
    try {
        if (!session?.user) {
            throw new Error('No hay usuario en la sesión');
        }
        return session.user;
    } catch (error) {
        console.error('Error en getUser:', error);
        throw error;
    }
}

// Destruye la sesión activa en el servidor
async function logoutService(req) {
    try {
        await new Promise((resolve, reject) => {
            req.session.destroy((err) => (err ? reject(err) : resolve()));
        });
    } catch (error) {
        console.error('Error en logoutService:', error);
        throw error;
    }
}

export default {
    registerService,
    loginService,
    getUser,
    logoutService
};