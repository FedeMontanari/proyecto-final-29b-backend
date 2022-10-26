const {User} = require('../../db')

const postUser = async(req, res) => {
    try {
        const {fullName, phoneNumber, email, occupation, address} = req.body;
        if (!fullName || !phoneNumber || !email || !occupation || !address){
            return res.status(400).send('missing value detected.')
        }
        else {
            const newProfessional = await User.create({
                fullName,
                phoneNumber,
                email,
                occupation,
                address
            })
            return res.status(201).send('new Professional created.')
        }
        
    } catch (e) {
        return res.status(400).send(console.log(e))
    }
}

module.exports = {postUser}