const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//Me traigo los modelos y el servidor.
const pokemons = require('./pokemons');
const types = require('./types');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemons);
router.use('/types', types);

module.exports = router;
