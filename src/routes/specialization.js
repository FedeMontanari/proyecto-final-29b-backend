const { Router } = require("express");
const { Specialization } = require("../db");
const { API_KEY } = process.env;
const router = Router();

router.post("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
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
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const allSpecs = await Specialization.findAll();
      if (!allSpecs.length) {
        return res.status(200).send("No specializations created yet");
      }
      return res.status(200).json(allSpecs);
    } catch (error) {
      return res.status(404).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.put("/id/:id", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const idParam = req.params.id;
      const { name, description, pricing } = req.body;
      if (isNaN(idParam)) res.status(400).send("ID must be a number");
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
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.delete("/id/:id", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const { id } = req.params;
      if (!id) res.status(400).send("Missing value detected.");
      if (isNaN(id)) res.status(400).send("ID must be a number");
      else {
        let specialty = await Specialization.findOne({
          where: {
            id: id,
          },
        });
        if (specialty) {
          Specialization.destroy({
            where: {
              id: id,
            },
          });
          return res.status(200).send("Specialization deleted.");
        } else res.status(404).send("Specialization not found.");
      }
    } catch (e) {
      res.status(400).send(console.log(e));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

module.exports = router;
