const { Router } = require("express");
const { Admin } = require("../db");
const admin = require("../models/admin");
const router = Router();

router.post("/", async (req, res) => {
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
});

router.get("/", async (req, res) => {
  try {
    const allAdmins = await Admin.findAll();
    return res.json(allAdmins);
  } catch (error) {
    return res.status(404).send(console.log(error));
  }
});

router.put('/id/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).send("missing value detected.");
    }
    if (id) {
      const adminFound = await Admin.findOne({
        where: {
          id: id
        }
      })
      if (adminFound) {
        const updateAdmin = {
          fullName,
          email,
          password
        }
        adminFound.update(updateAdmin)
        return res.status(200).send('Admin Updated successfully.')
      }
    }
  } catch (e) {
    return res.status(400).send(console.log(e))
  }
})

router.delete('/id/:id', async (req, res) => {
  try {
      const {id} = req.params;
      if(!id) res.status(400).send('Missing value detected.')
      else {
          let adminFound = await Admin.findOne({
              where: {
                  id: id
              }
          });
          if (adminFound.length !==0) {
              Admin.destroy({
                  where: {
                      id: id
                  }
              })
              return res.status(200).send('Admin deleted.')
          } else res.status(404).send('Admin not found.')
      }
  } catch (e) {
      res.status(400).send(console.log(e))
  }
})

module.exports = router;
