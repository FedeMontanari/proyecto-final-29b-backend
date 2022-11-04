const { Router } = require("express");
const { Admin } = require("../db");
const router = Router();
const { API_KEY } = process.env;

router.post("/", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName || !email || !password) {
        return res.status(400).send("missing value detected.");
      } else {
        const newAdmin = await Admin.create({
          fullName,
          email,
          password,
        });
        return res.status(201).send("new Admin created.");
      }
    } catch (e) {
      return res.status(400).send(console.log(e));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("/", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const allAdmins = await Admin.findAll();
      return res.json(allAdmins);
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
      const { id } = req.params;
      const { fullName, email, password } = req.body;
      if (isNaN(id)) res.status(400).send("ID must be a number");
      if (!fullName || !email || !password) {
        return res.status(400).send("missing value detected.");
      }
      if (id) {
        const adminFound = await Admin.findOne({
          where: {
            id: id,
          },
        });
        if (adminFound) {
          const updateAdmin = {
            fullName,
            email,
            password,
          };
          adminFound.update(updateAdmin);
          return res.status(200).send("Admin Updated successfully.");
        } else {
          return res.status(404).send("Admin with that ID could not be found");
        }
      } else {
        return res.status(400).send("No ID provided");
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
      if (isNaN(id)) res.status(400).send("ID must be a number");
      if (!id) res.status(400).send("Missing value detected.");
      else {
        let adminFound = await Admin.findOne({
          where: {
            id: id,
          },
        });
        if (adminFound) {
          Admin.destroy({
            where: {
              id: id,
            },
          });
          return res.status(200).send("Admin deleted.");
        } else res.status(404).send("Admin not found.");
      }
    } catch (e) {
      res.status(400).send(console.log(e));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

module.exports = router;
