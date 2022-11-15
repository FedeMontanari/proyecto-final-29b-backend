const { Router } = require("express");
const { Specialization, User, Category } = require("../db");
const { API_KEY } = process.env;
const router = Router();

router.post("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const {
        categoryId,
        name,
        description,
        availableDays,
        pictures,
        userId,
        pricing,
      } = req.body;

      if (!categoryId || !userId || !description || !name || !pricing) {
        return res.status(400).json({ message: "Missing value detected." });
      } else {
        const category = await Category.findOne({
          where: {
            id: categoryId
          }
        })
        const user = await User.findOne({
          where: {
            id: userId,
          },
        });

        if(category && user) {
          const newSpecialization = await Specialization.create({
            categoryId,
            name,
            description,
            availableDays,
            pictures,
            userId,
            pricing,
          });
          category.addSpecialization(newSpecialization)
          user.addSpecialization(newSpecialization)
          return res
            .status(201)
            .json({ message: "New specialization created." });
        } else {
          return res  
            .status(400)
            .json({ message: "Could not create specialization. Check Id's sent"})
        }
      }
    } catch (e) {
      return res.status(400).json({ message: "error detected", error: e });
    }
  } else {
    return res.status(400).json({ message: "Wrong or missing API key" });
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
    } catch (e) {
      return res.status(400).json({ message: "error detected", error: e });
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.put("/id/:id", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const idParam = req.params.id;
      const {
        categoryId,
        name,
        description,
        availableDays,
        pictures,
        userId,
        pricing,
      } = req.body;
      if (isNaN(idParam)) res.status(400).send("ID must be a number");
      if (idParam) {
        const specialty = await Specialization.findOne({
          where: {
            id: idParam,
          },
        });
        if (specialty) {
          const updateSpecialty = {
            categoryId,
            name,
            description,
            availableDays,
            pictures,
            userId,
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
      return res.status(400).json({ message: "error detected", error: e });
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
      return res.status(400).json({ message: "error detected", error: e });
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

module.exports = router;
