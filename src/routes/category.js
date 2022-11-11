const { Router } = require("express");
const { Category } = require("../db");
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
        const newCategory = await Category.create({
          name,
          image,
        });
        return res.status(201).send("new Category created.");
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
      const allCategories = await Category.findAll();
      return res.json(allCategories);
    } catch (error) {
      return res.status(404).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("/name/:category", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    let { category } = req.params;
    let arr = category.split(" ");
    arr = arr.map((e) => {
      let word = e.split("");
      word[0] = word[0].toUpperCase();
      word = word.join("");
      return word;
    });
    arr = arr.join(" ");
    console.log(arr)
    try {
      const findCategory = await Category.findAll({
        where: {
          name:  {[Op.like]: `%${arr}%` },
        },
      });
      if (findCategory.length === 0) {
        res.status(400).send("Category not found");
      } else {
        res.status(200).json(findCategory);
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
        const toUpdateCategory = await Category.findOne({
          where: {
            id: idParams
          }
        })
        if(toUpdateCategory) {
          const updatedCategory = {
            name,
            image
          }
          toUpdateCategory.update(updatedCategory);
          return res.status(200).send("Category updated successfully.");
        } else {
          return res.status(404).send("Category could not be found.");
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
      const toDeleteCategory = await Category.findOne({
        where: {
          id: idParams
        }
      })
      if(toDeleteCategory) {
        Category.destroy({
          where: {
            id: idParams
          }
        })
        return res.status(200).send("Category deleted.");
      } else res.status(404).send("Category not found.");
    } catch (error) {
      return res.status(400).send(console.log(error));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.post("/bulk", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const newCategory = await Category.bulkCreate(req.body);
      return res.status(200).send("Bulk created Pog");
    } catch (e) {
      return res.status(400).send(console.log(e));
    }
  } else {
    return res.status(400).send("Wrong or missing API key");
  }
});

module.exports = router;
