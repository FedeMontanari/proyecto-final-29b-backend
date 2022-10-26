const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Genre, sequelize } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { QueryTypes } = require("sequelize");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const genreDb = await Genre.findAll();
  if (genreDb.length === 0) {
    await axios
      .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((genreRes) => {
        const toMap = genreRes.data.results.map((e) => ({
          id: e.id,
          name: e.name,
        }));
        return toMap;
      })
      .then((mappedRes) => {
        mappedRes.forEach((genre) => {
          Genre.findOrCreate({
            where: {
              id: genre.id,
              name: genre.name,
            },
          });
        });
      })
      .then(() => {
        return Genre.findAll();
      })
      .then((finalGenres) => {
        res.json(finalGenres);
      });
  } else {
    res.json(genreDb);
  }
});

module.exports = router;
