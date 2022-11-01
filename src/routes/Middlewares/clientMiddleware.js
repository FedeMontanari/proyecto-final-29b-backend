const { Router } = require("express");
const { getClient } = require("../Controllers/getClient.js");
const { postClient } = require("../Controllers/postClient.js");
const { Client } = require("../../db");
const router = Router();

router.get("", getClient);
router.post("", postClient);
router.put("", async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    address,
    description,
    image,
    password,
    reviews,
  } = req.body;
  try {
    if (email) {
      const client = await Client.findOne({
        where: {
          email: email,
        },
      });
      if (client) {
        const updateClient = {
          fullName,
          phoneNumber,
          email,
          address,
          description,
          image,
          password,
          reviews,
        };
        prof.update(updateClient);
        return res.status(200).send("Client Updated.");
      }
    } else {
      return res.status(404).send("Client not found");
    }
  } catch (e) {
    return res.status(404).send(console.log(e));
  }
});

module.exports = router;
