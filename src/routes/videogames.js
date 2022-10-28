const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    const apiRequest = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name.toLowerCase()}`
    );
    const dbRequest = Videogame.findAll({
      where: {
        name,
      },
    });
    try {
      Promise.all([apiRequest, dbRequest]).then(([apiRes, dbRes]) => {
        const mapData = apiRes.data.results.map((e) => ({
          id: e.id,
          name: e.name,
          image: e.background_image,
          genre: e.genres,
          rating: e.rating,
        }));
        const finalList = dbRes.concat(mapData);
        res.json(finalList);
      });
    } catch (error) {
      res.status(404).send("Game not found");
    }
  } else {
    try {
      let i = 1;
      let gamePromise = [];
      while (i <= 5) {
        let currentUrl = axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20&page=${i}`
        );
        let apiInfo = currentUrl.then((res) =>
          res.data.results.map((e) => ({
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map((g) => ({ id: g.id, name: g.name })),
            rating: e.rating,
            order: e.added,
            platforms: e.parent_platforms.map((p) => ({
              id: p.platform.id,
              platform: p.platform.name,
            })),
            created: false,
          }))
        );
        i++;
        gamePromise = [...gamePromise, apiInfo];
      }

      const getDbInfo = () => {
        const dbInfo = Videogame.findAll({
          include: {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
        return dbInfo.then((r) =>
          r.map((v) => {
            const {
              id,
              name,
              genres,
              image,
              description,
              released,
              rating,
              platforms,
              created,
            } = v;
            const game = {
              id,
              name,
              genres: genres,
              image,
              description,
              released,
              rating,
              platforms,
              created,
            };
            return game;
          })
        );
      };

      const dbGames = getDbInfo ()

      gamePromise.push(dbGames);
      
      await Promise.all(gamePromise).then(([a, b, c, d, e, f]) => {
        const response = a.concat(b, c, d, e);
        if (f.length) {
          f.map((f) => response.unshift(f))
        }
        res.send(response);
      });
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, description, released, rating, platforms, image, genres } =
      req.body;
      if(!image){
        image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiWF7LyIWElDeVViKVeWM2f-tTkNkxVH0fIxUw2AZblw&s";
      }
    if (
      name &&
      description &&
      released &&
      rating &&
      platforms.length &&
      genres.length
    ) {
      Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        image,
      }).then((newGame) => {
        genres.map((g) => {
          Genre.findAll({
            where: { name: g },
          }).then((genre) => newGame.addGenre(genre));
        });
      });
      res.status(200).send("Juego creado con exito!");
    } else {
      res.status(400).send("Faltaron datos para crear el juego");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Videogame.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).send('Game deleted correctly!')
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})

module.exports = router;
