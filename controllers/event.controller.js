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
        await dbEvent.save()
        
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

const getAllEvents = async( req, res) => {
    try{
        const events = await Event.find().select('name')
        
        return res.status(200).json({
        ok: true,
        events: events
    }) 
    } catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'server error getting events, contact support'
        })
    }
}

const deleteEventById = async(req, res) => {
    const {id} = req.params.id
    try{
        const event = await Event.findOneAndDelete({_id: id})
        if(event){
            return res.status(200).json({
                ok: true,
                msg: `Event ${event.name} has been deleted`
            })
        }
        return res.status(400).json({
            ok: false, 
            msg: 'Event was not found for deletetion'
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'server error when deleting event, contact support'
        })
    }
}

module.exports = {
    createEvent,
    deleteEventById,
    getAllEvents
} 