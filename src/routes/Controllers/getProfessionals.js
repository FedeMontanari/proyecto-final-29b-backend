const {Professional} = require('../../db')

const getProfessionals = async(req, res) => {
    try {
        const allProfessionals = await Professional.findAll()
        return res.json(allProfessionals)
    } catch (error) {
        return res.status(404).send(console.log(error))
    }

}

module.exports = {getProfessionals}