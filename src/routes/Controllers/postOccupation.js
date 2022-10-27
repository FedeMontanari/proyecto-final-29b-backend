const {Occupation} = require('../../db')

const postOccupation = async(req, res) => {
    try {
        const {name, image} = req.body;
        if (!name || !image){
            return res.status(400).send('missing value detected.')
        }
        else {
            const newOccupation = await Occupation.create({
                name,
                image
            })
            return res.status(201).send('new Occupation created.')
        }
        
    } catch (e) {
        return res.status(400).send(console.log(e))
    }
}

module.exports = {postOccupation}