const {Client} = require('../../db')

const getClients = async(req, res) => {
    try {
        const allClients = await Client.findAll()
        return res.json(allClients)
    } catch (error) {
        return res.status(404).send(console.log(error))
    }
}

module.exports = {getClients}