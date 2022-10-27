const {Client} = require('../../db');

const postClient = async (req, res) => {
    try {
        const{fullName, phoneNumber, email, address, password, description} = req.body;

        if(!fullName || !phoneNumber || !email || !address || !password || !description){
            return res.status(400).send('missing value detected.');
        } else {
            const newClient = await Client.create({
                fullName,
                phoneNumber,
                email,
                address,
                password,
                description
            });
            return res.status(201).send('New Client Created.');
        }
    } catch (e) {
        return res.status(400).send(console.log(e));
    }
};

module.exports = {postClient}