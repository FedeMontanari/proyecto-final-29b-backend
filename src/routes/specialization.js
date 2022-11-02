const { Router } = require("express");
const { Specialization } = require("../db");
const router = Router();

router.post("", async (req, res) => {
  try {
    const { name, description, pricing } = req.body;
    if (!name || !description || !pricing) {
      return res.status(400).send("Missing value detected.");
    } else {
      const newSpecialization = await Specialization.create({
        name,
        description,
        pricing,
      });
      return res.status(201).send("New specialization created.");
    }
  } catch (e) {
    return res.status(400).send(console.log(e));
  }
});

router.put("/id/:id", async (req, res) => {
  try {
    const idParam = req.params.id;
    const { name, description, pricing } = req.body;

    if (idParam) {
      const specialty = await Specialization.findOne({
        where: {
          id: idParam,
        },
      });
      if (specialty) {
        const updateSpecialty = {
          name,
          description,
          pricing,
        };

        specialty.update(updateSpecialty);
        return res.status(200).send("Specialization updated successfully.");
      } else {
        return res.status(404).send("Specialization could not be found.");
      }
    } else {
      return res.status(404).send("Missing value detected.");
    }
  } catch (e) {
    return res.status(400).send(console.log(e));
  }
});

router.delete('/id/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) res.status(400).send('Missing value detected.')
        else {
            let specialty = await Specialization.findOne({
                where: {
                    id: id
                }
            });
            if (specialty.length !==0) {
                Specialization.destroy({
                    where: {
                        id: id
                    }
                })
                return res.status(200).send('Specialization deleted.')
            } else res.status(404).send('Specialization not found.')
        }
    } catch (e) {
        res.status(400).send(console.log(e))
    }
})

module.exports = router;
