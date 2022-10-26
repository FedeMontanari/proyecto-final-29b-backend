const {Professional} = require('../../models/professional.js')

const postUser = async(req, res) => {
    try {
        const {fullName, phoneNumber, email, occupation, address, description, image} = req.body;
        if (!fullName || !phoneNumber || !email || !occupation || !address || !description){
            return res.status(400).send('missing value detected.')
        }
        else {
            const newProfessional = await Professional.create({
                fullName,
                phoneNumber,
                email,
                occupation,
                address,
                description,
                image
            })
            return res.status(201).send('new Professional created.')
        }
        
    } catch (e) {
        return res.status(400).send(console.log(e))
    }
}

module.exports = {postUser}