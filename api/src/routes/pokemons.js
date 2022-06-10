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
router.get('/', (req, res) => {
  const { name } = req.query;

  getAllPokemon().then((response) => {
    if (name) {
      getByName(name).then((responseName) => {
        if (responseName.name) {
          res.send(responseName);
        } else {
          res.status(404).send('No existe');
        }
      });
    } else if (response) {
      res.status(200).json(response);
    }
  });
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
router.post('/', async (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, type, img } =
    req.body;

  try {
    const pokemon = await getByName(name);

    if (pokemon.id) {
      return res.status(404).send('Already exists');
    }

    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
    });

    const types = await Tipo.findAll({ where: { name: type } });
    newPokemon.addTipo(types);

    res.send('Created succesfully');
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    Pokemon.destroy({ where: { id } });
    res.send('Done');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
