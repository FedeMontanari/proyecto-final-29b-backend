const { Professional } = require("../../db");

const deleteProfessional = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email) return res.status(200).send('Missing value detected.');
        else {
            let prof = await Professional.findOne({
                where: {
                    email: email
                }
            })

            if(prof.length>0){
                Professional.destroy({
                    where: {
                        email: email
                    }
                })
                return res.status(204).send('Professional deleted.')
            }
            else res.status(405).send('Professional not found.')
            
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {deleteProfessional}