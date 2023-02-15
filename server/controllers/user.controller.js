const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const serverSecret = "secret_smile"

module.exports.getUserList = async (req, res) => {
    try {
        const sort = { type: 1 };
        const userList = await User.find().sort(sort);
        res.json({
            message: 'Se entregan de manera exitosa todos los usuarios',
            userList,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    };
}

module.exports.getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json({
            message: 'Se trae de manera exitosa la información del usuario',
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    }
}

module.exports.createUser = async (req, res) => {
    try {
        let entity = await User.find( { "email": req.body.email } );
        if (entity.length !== 0) {
            throw new Error('El correo ya existe');
        }
        const newUser = await User.create(req.body);
        res.json({
            message: 'Se crea de manera exitosa el nuevo usuario',
            newUser,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error: error.message,
        });
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const { params, body } = req;
        const { id } = params;
        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
        res.json({
            message: 'Se actualiza de manera exitosa la información',
            updatedUser,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    }
}

module.exports.removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.deleteOne({ _id: id });
        res.json({
            message: 'Se actualiza de manera exitosa la información del usuario',
            deletedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    }
}

module.exports.login = async (req, res) => {
    let user = await User.findOne( { "email": req.body.email, "password": req.body.password } );
    if (user){
        let token = jwt.sign(user.toJSON(), serverSecret, { expiresIn: '30m' });
        res.send({
            status: "OK",
            token: token,
        });
    } else {
        res.status(401).send({error: "Invalid Login"})
    }
}

