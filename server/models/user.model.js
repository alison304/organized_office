const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Debes ingresar un nombre de usuario'],
        minlength: [3, 'Debe ingresar al menos 4 caracteres'],
        maxlength: [20, 'Too Long!'],
    },    
    lastName: {
        type: String,
        required: [true, 'Debes ingresar tus apellidos'],
        minlength: [3, 'Debe ingresar al menos 4 caracteres'],
        maxlength: [20, 'Too Long!'],
    },
    age: {
        type: Number,
        required: [true, 'Debes ingresar tu edad'],
        min: [18, 'La edad minima permitida es de 18 años']
    },
    phone: {
        type: String,
        required: [false, 'Debes ingresar tu numero de telefono'],
        minlength: [8, 'Debe ingresar al menos 8 caracteres'],
    },
    address: {
        type: String,
        required: [false, 'Debes ingresar tu dirección'],
        maxlength: [20, 'Too Long!'],
    },
    country: {
        type: String,
        required: [false, 'Debes ingresar tu país'],
        maxlength: [20, 'Too Long!'],
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
        required: [false, 'Debes ingresar tu contraseña'],
    },
    password2: {
        type: String,
        required: [false, 'Debe ingresar la confirmación de contraseña'],
    },     
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);

module.exports = User;