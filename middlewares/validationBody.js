const { body } = require('express-validator')

const users = [
    body('email', 'No dejes este campo vacío').normalizeEmail().notEmpty(),
    body('email', 'El email es inválido').normalizeEmail().isEmail(),
    body('pw', 'No dejes este campo vacío').notEmpty(),
    body('pw', 'Escribe una contraseña segura con al menos 8 caracteres, una letra mayúscula, minúscula, números y caracteres').isStrongPassword().isLength({ min:8}),
    body('nombre', 'No dejes este campo vacío').notEmpty(),
    body('nacionalidad', 'No dejes este campo vacío').notEmpty(),
    body('documentoDeIdentidad', 'No dejes este campo vacío').notEmpty(),
    body('documentoDeIdentidad', 'Escribe solo numeros').isNumeric(),
]

module.exports = users