const User = require('./../models/User')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    const { email, pw, edad, nombre, nacionalidad, documentoDeIdentidad } = req.body
    try {
        const user = await User.findOne({email:email})
        if(user) return res.status(400).json({
            ok:false,
            msg: `${email} ya esta en uso.`
        })
        const salt = bcrypt.genSaltSync()
        const dbUser= new User ({
            email: email,
            pw: pw,
            edad: edad,
            nombre: nombre,
            nacionalidad: nacionalidad, 
            documentoDeIdentidad: documentoDeIdentidad
        })
        dbUser.pw = bcrypt.hashSync(pw, salt)
        await dbUser.save()
        return  res.status(201).json({
            ok:true, 
            msg: 'El usuario fue creado exitosamente'
        })
    } catch (error) {
        console.log(error)
        return req.status(500).json({
            ok:false,
            msg: 'Por favor contacta a soporte'
        })
    }
}

module.exports = {
    createUser
}

