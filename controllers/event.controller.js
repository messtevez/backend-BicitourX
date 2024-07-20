const Event = require('./../models/Event')

const createEvent = async( req, res) => {
    const {name, date, hour, location, cost, distance, capacity, category} = req.body

    try{
        const dbEvent = new Event({
            name: name,
            date: date, 
            hour: hour, 
            location: location, 
            cost: cost, 
            distance: distance,
            capacity: capacity, 
            category: category
        })
        await dbEvent.save(); 
        return res.status(201).json({
            ok: true, 
            msg: 'Evento creado exitosamente'
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error unable to create event, contact support'
        })
    }
}

module.exports = createEvent; 