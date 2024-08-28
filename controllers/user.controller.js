const User = require('./../models/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('../middlewares/jwtGenerateToken')

const createUser = async (req, res) => {
    const { email, pw, edad, nombre, nacionalidad, documentoDeIdentidad, tipoDeDocumento, numeroDeContacto } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (user) return res.status(400).json({
            ok: false,
            msg: `${email} ya esta en uso.`
        })
        const salt = bcrypt.genSaltSync()
        const dbUser = new User({
            email: email,
            pw: pw,
            edad: edad,
            nombre: nombre,
            nacionalidad: nacionalidad,
            tipoDeDocumento: tipoDeDocumento,
            documentoDeIdentidad: documentoDeIdentidad,
            numeroDeContacto: numeroDeContacto
        })
        dbUser.pw = bcrypt.hashSync(pw, salt)
        await dbUser.save()
        return res.status(201).json({
            ok: true,
            msg: 'El usuario fue creado exitosamente'
        })
    } catch (error) {
        console.log(error)
        return req.status(500).json({
            ok: false,
            msg: 'Por favor contacta a soporte'
        })
    }
}

const loginUser = async (req, res) => {
    const { email, pw } = req.body
    try {
        const dbUser = await User.findOne({ email })
        if (!dbUser) return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe.'
        })
        const validatePw = bcrypt.compareSync(pw, dbUser.pw)
        if (!validatePw) return res.status(400).json({
            ok: false,
            msg: 'El correo y la contraseña no coinciden.'
        })
        const token = await generateToken(dbUser._is, dbUser.email)

        return res.status(200).json({
            ok: true,
            msg: 'Sesion iniciada',
            token: token,
            nombre: dbUser.nombre,
            email: dbUser.email
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacta a soporte'
        })
    }
}

const updateUser = async (req, res) => {
    const { email, pw, edad, nombre } = req.body
    try {
        const updatedData = {};
        if (email) updatedData.email = email;
        if (pw) updatedData.pw = pw;
        if (edad) updatedData.edad = edad
        if (nombre) updatedData.nombre = nombre
        const user = await User.findOneAndUpdate({ email: email }, updatedData)
        if (!user) return res.status(400).json({
            ok: false,
            msg: `Usuario con email ${email} no fue encontrado`
        })
        return res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            user: user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacta a soporte'
        })
    }
}

const deleteUser = async (req, res) => {
    const email = req.query
    console.log(email)
    try {
        const user = await User.findOneAndDelete(email)
        if (user) return res.status(200).json({
            ok: true,
            msg: 'El usuario ha sido eliminado correctamente'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacta a soporte'
        })
    }
}

const getUserByEmail = async (req, res) => {
    const email = req.params.email
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(200).json({
                ok: true,
                email:user.email,
                pw: user.pw,
                edad: user.edad,
                nombre: user.nombre,
                nacionalidad: user.nacionalidad,
                tipoDeDocumento: user.tipoDeDocumento,
                documentoDeIdentidad: user.documentoDeIdentidad,
                numeroDeContacto: user.numeroDeContacto
            })
        }
        return res.status(400).json({
            ok: false,
            msg: 'No se encontró el usuario.'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacta a soporte.'
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserByEmail
}

