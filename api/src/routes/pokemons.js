const { Router } = require('express');
const { Pokemon, Tipo } = require('../db.js');
const router = Router();
const { getAllPokemon } = require('./middleware/getAllPokemons');
const { getById } = require('./middleware/getPokemonById');
const { getByName } = require('./middleware/getPokemonByName');
//GET: /pokemons -> Tendria que traer un listado de los pokemons desde la api
//Devolver solo los datos necesarios para la ruta principal
//GET: /pokemons?name="..." -> me pasan los valores por query
//Traer el pokemon que coincida con el nombre (el query puede ser de la api o creado por nosotrs)
//Si no existe un pokemon con este nombre, debemos mostrar un mensaje, Ruta hecha en la primera
router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    const response = await getAllPokemon();
    if (name) {
      const responseName = await getByName(name);
      res.status(200).send(responseName);
    } else {
      res.status(200).json(response);
    }
  } catch (e) {
    next(e);
    res.status(400).send('Server error');
  }
});

//GET: /pokemons/:idPokemon -> Me pasan el id por params
//Tengo que traer el detalle un pokemon en particular
//Traer solo los datos pedidos en la ruta de detalle de pokemon
//Tener en cuenta que debe funcionar para un id creado por nosotros o por la api

//REFACCIONAR PARA BUSCAR EN NUESTRA BD
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const pokemon = await getById(id);
      pokemon
        ? res.status(200).send(pokemon)
        : res.status(404).send('No existe pokemon con ese id');
    }
  } catch (e) {
    res.status(404).send('Server error');
  }
});

//POST: /pokemons -> CREA UN POKEMON recibo datos por body
//Crea un pokemon en la bd
router.post('/', (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, type, img } =
    req.body;

  Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
  })
    .then((newPokemon) =>
      Tipo.findAll({ where: { name: type } }).then((matchTypes) =>
        newPokemon.addTipo(matchTypes)
      )
    )
    .catch((error) => next(error));

  res.send('Pokemon creado con exito');
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  Pokemon.destroy({ where: { id } });
  res.send('Done');
});

router.put('/put/:id', async (req, res) => {
  const { id } = req.params;
  const { name, hp, attack, defense, speed, weight, height, img, type } =
    req.body;
  // const pokemons = await getAllPokemon();
  const toEdit = await Pokemon.update(
    {
      name,
      hp,
      attack,
      defense,
      speed,
      weight,
      height,
      img,
      type,
    },
    { where: { id } }
  );
  res.send('Done');
});
module.exports = router;
