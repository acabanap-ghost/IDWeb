const bcrypt = require('bcryptjs');
const users = require('../data/users');
//REGISTRO
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y contraseña son obligatorios'
            });
        }
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({
                message: 'El usuario ya está registrado'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length + 1,
            email,
            password: hashedPassword
        };
        users.push(newUser);
        res.status(201).json({
            message: 'Usuario registrado correctamente'
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};
//INICIO DE SESIÓN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }
        req.session.userId = user.id;
        res.json({
            message: 'Inicio de sesión exitoso'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
//CIERRE DE SESIÓN
const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al cerrar sesión'
            });
        }
        res.clearCookie('connect.sid');
        res.json({
            message: 'Sesión cerrada correctamente'
        });
    });
};
module.exports = {
    register,
    login,
    logout
};
