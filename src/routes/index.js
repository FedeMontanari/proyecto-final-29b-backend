const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRoute = require('./videogames');
const genresRoutes = require('./genres');
const { API_KEY } = process.env
const axios = require('axios');
const { Videogame } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogameRoute);
router.use('/genres', genresRoutes);

router.get('/videogame/:id', async (req, res) => {
    const dbCheck = req.params.id.split('-')
    try {
        
        if(dbCheck.length === 1){
            const apiRequest = await axios.get(`https://api.rawg.io/api/games/${req.params.id}?key=${API_KEY}`)
            const finalData = (({
                id,
                background_image,
                name,
                genres,
                description,
                released,
                rating,
                parent_platforms
            }) => ({
                id,
                background_image,
                name,
                genres,
                description,
                released,
                rating,
                parent_platforms
            }))(apiRequest.data)
        
            finalData.image = finalData.background_image;
            delete finalData.background_image;
            finalData.platforms = finalData.parent_platforms.map(e => ({id: e.platform.id, name: e.platform.name}));
            delete finalData.parent_platforms;
            finalData.genres = finalData.genres.map(e => ({id: e.id, name: e.name}))
        
            res.json(finalData)
        }else if(dbCheck.length >= 1){
            const dbRequest = await Videogame.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.send(dbRequest)
        }

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
    

})

//imagen, nombre, generos, descripcion, fecha de lanzamiento, rating, plataformas

module.exports = router;
