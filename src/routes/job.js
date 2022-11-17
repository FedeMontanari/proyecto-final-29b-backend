const { Router } = require("express");
const { Job, User } = require("../db");
const { Op } = require("sequelize");
const clientMail = require("../emailer/clientMail");
const professionalMail = require("../emailer/professionalMail")
const { API_KEY } = process.env;
const router = Router();

const capitalize = (fullName) =>
  fullName
    .split(" ")
    .map((name) => `${name[0].toUpperCase()}${name.slice(1)}`)
    .join(" ");

router.post("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const { clientId, professionalId, specializationId } = req.body;
      if (!clientId || !professionalId || !specializationId) {
        return res.status(400).send("missing value detected.");
      } else {
        const client = await User.findOne({
          where: {
            id: clientId,
          },
        });
        const professional = await User.findOne({
          where: {
            id: professionalId,
          },
        });
        if (client) {
          clientMail.sendClientMail(client);
        } else {
          return res.status(404).send("No user with that 'clientId'");
        }
        if (professional) {
          professionalMail.sendProfessionalMail(professional);
        } else {
          return res.status(404).send("No user with that 'professionalId'");
        }
        const newCategory = await Job.create({
          clientId,
          professionalId,
          specializationId,
        });
        return res.status(201).send("new Job created.");
      }
    } catch (error) {
      return res.status(400).json({ message: "Error detected", error: error });
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const allJobs = await Job.findAll();
      console.log(allJobs);
      return res.json(allJobs);
    } catch (error) {
      return res.status(404).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("/job/:id", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    const { id } = req.params;
    try {
      const findJob = await Job.findAll({
        where: {
          id: id,
        },
      });
      if (findJob.length === 0) {
        res.status(400).send("Job not found");
      } else {
        res.status(200).json(findJob);
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: "Error detected", error: error }, console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing key");
  }
});

router.put("/job/:id", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const { id } = req.params;
      const { clientId, professionalId, specializationId } = req.body;
      if (!id) return res.status(400).send("Missing value detected.");
      if (isNaN(id)) return res.status(400).send("ID must be a number");
      if (id) {
        const toUpdateJob = await Job.findOne({
          where: {
            id: id,
          },
        });
        if (toUpdateJob) {
          const updatedJob = {
            clientId: clientId,
            professionalId: professionalId,
            specializationId: specializationId,
          };
          console.log(updatedJob);
          toUpdateJob.update(updatedJob);
          return res.status(200).send("Job updated successfully.");
        } else {
          return res.status(404).send("Job could not be found.");
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

router.delete("/job/:id", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const id = req.params;
      if (!id) return res.status(400).send("Missing value detected.");
      if (isNaN(id)) return res.status(400).send("ID must be a number");
      const toDeleteJob = await Job.findOne({
        where: {
          id: id,
        },
      });
      if (toDeleteJob) {
        Job.destroy({
          where: {
            id: id,
          },
        });
        return res.status(200).send("Job deleted.");
      } else res.status(404).send("Job not found.");
    } catch (error) {
      return res.status(400).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

module.exports = router;
