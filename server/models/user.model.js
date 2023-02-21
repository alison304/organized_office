const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Debes ingresar un nombre de usuario'],
        minlength: [3, 'Debe ingresar al menos 4 caracteres'],
    },    
    lastName: {
        type: String,
        required: [true, 'Debes ingresar tus apellidos'],
        minlength: [3, 'Debe ingresar al menos 4 caracteres'],
    },
    age: {
        type: Number,
        required: [true, 'Debes ingresar tu edad'],
        min: [18, 'La edad minima permitida es de 18 años']
    },
    phone: {
        type: String,
        required: [false, 'Debes ingresar tu numero de telefono'],
    },
    address: {
        type: String,
        required: [false, 'Debes ingresar tu direccion'],
    },
    country: {
        type: String,
        required: [false, 'Debes ingresar tu pais'],
    },
    birthdate: {
        type: Date,
        required: [false, 'Debes ingresar una fecha'],
    },    
    email: {
        type: String,
        required: [true, 'Debes ingresar tu email'],
        match: [ /.+\@.+\..+/, "Email inválido"],
        unique: true,
    },
    password: {
        type: String,
        required: [false, 'Debes ingresar tu password'],
    },        
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);

module.exports = User;