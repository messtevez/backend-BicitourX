const User = require('./../models/User')
const bcrypt = require('bcrypt')
const {generateToken} = require('./../middlewares/jwtValidaton')

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

const loginUser = async(req, res)=>{
    const {email, pw}= req.body
    try {
        const dbUser = await User.findOne({email})
        if(!dbUser) return res.status(400).json({
            ok:false, 
            msg: 'El correo y la contraseña no coinciden.'
        })
        const validatePw = bcrypt.compareSync(pw, dbUser.pw)
        if (!validatePw) return res.status(400).json({
            ok:false,
            msg: 'El correo y la contraseña no coinciden.'
        })
        const token = await generateToken(dbUser._is, dbUser.email)

        return res.status(200).json({
            ok:true, 
            msg: 'Sesion iniciada',
            token:token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Por favor contacta a soporte'
        })
    }
}

//updateUser

const updateUser = async(req, res)=>{
    const{email, pw, edad, nombre, nacionalidad, documentoDeIdentidad} = req.body
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Por favor contacta a soporte'
        })
    }
}



module.exports = {
    createUser,
    loginUser
}

