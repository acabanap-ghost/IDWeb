const users = require('../data/users');
const getPerfil = (req, res) => {
    const user = users.find(
        user => user.id === req.session.userId
    );
    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
    res.json({
        id: user.id,
        email: user.email
    });
};
module.exports = {
    getPerfil
};
