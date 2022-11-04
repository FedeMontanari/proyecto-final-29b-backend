const { Router } = require("express");
const { Occupation } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const router = Router();

router.post("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const { name, image } = req.body;
      if (!name || !image) {
        return res.status(400).send("missing value detected.");
      } else {
        const newOccupation = await Occupation.create({
          name,
          image,
        });
        return res.status(201).send("new Occupation created.");
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
      const allOccupations = await Occupation.findAll();
      return res.json(allOccupations);
    } catch (error) {
      return res.status(404).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("/name/:occupation", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    let { occupation } = req.params;
    let arr = occupation.split(" ");
    arr = arr.map((e) => {
      let word = e.split("");
      word[0] = word[0].toUpperCase();
      word = word.join("");
      return word;
    });
    arr = arr.join(" ");
    console.log(arr)
    try {
      const findOccupation = await Occupation.findAll({
        where: {
          name:  {[Op.like]: `%${arr}%` },
        },
      });
      if (findOccupation.length === 0) {
        res.status(400).send("Occupation not found");
      } else {
        res.status(200).json(findOccupation);
      }
    } catch (error) {
      res.status(400).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing key");
  }
});

router.put("/id/:id", async(req, res) => {
  if(API_KEY === req.query.apikey) {
    try {
      const idParams = req.params.id;
      const { name, image } = req.body;
      if(!idParams) return res.status(400).send("Missing value detected.");
      if (isNaN(idParams)) return res.status(400).send("ID must be a number");
      if(idParams) {
        const toUpdateOccupation = await Occupation.findOne({
          where: {
            id: idParams
          }
        })
        if(toUpdateOccupation) {
          const updatedOccupation = {
            name,
            image
          }
          toUpdateOccupation.update(updatedOccupation);
          return res.status(200).send("Occupation updated successfully.");
        } else {
          return res.status(404).send("Occupation could not be found.");
        }
      } else {
        return res.status(404).send("Missing value detected.");
      }
    } catch (error) {
      return res.status(404).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing key");
  }
});

router.delete("/id/:id", async(req, res) => {
  if(API_KEY === req.query.apikey) {
    try {
      const idParams = req.params.id;
      if(!idParams) return res.status(400).send("Missing value detected.");
      if (isNaN(idParams)) return res.status(400).send("ID must be a number");
      const toDeleteOccupation = await Occupation.findOne({
        where: {
          id: idParams
        }
      })
      if(toDeleteOccupation) {
        Occupation.destroy({
          where: {
            id: idParams
          }
        })
        return res.status(200).send("Occupation deleted.");
      } else res.status(404).send("Occupation not found.");
    } catch (error) {
      return res.status(400).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

module.exports = router;
