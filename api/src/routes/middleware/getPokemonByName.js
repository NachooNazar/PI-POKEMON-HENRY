//NO SE USA
const axios = require('axios');
const { Pokemon, Tipo } = require('../../db');

const getByName = async (name) => {
  try {
    const db = await Pokemon.findOne({
      where: {
        name,
      },
      include: {
        //Incluime el model Tipo
        model: Tipo,
        //TRAEME EL ATRIBUTO NAME
        attributes: ['name'],
        //MEDIANTE LOS ATRIBUTOS, VA SIEMPRE, BUENA PRACTICA
        through: {
          attributes: [],
        },
      },
    });

    //HAGO FINDALL Y CONCATENO LAS DOS RESPONSE
    if (db) {
      return db;
    }

    const pokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    return {
      id: pokemon.data.id,
      name: pokemon.data.name,
      hp: pokemon.data.stats[0].base_stat,
      attack: pokemon.data.stats[1].base_stat,
      defense: pokemon.data.stats[2].base_stat,
      speed: pokemon.data.stats[5].base_stat,
      height: pokemon.data.height,
      weight: pokemon.data.weight,
      img: pokemon.data.sprites.front_default,
      type: pokemon.data.types.map((tipo) => tipo.type.name),
    };
  } catch (e) {
    console.log(e, ' Error L49 getPkmnByName');
  }
};

module.exports = { getByName };
