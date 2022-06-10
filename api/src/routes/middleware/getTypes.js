const axios = require('axios');
const { Tipo } = require('../../db');

const setTypes = async () => {
  try {
    const pokemonTypes = await axios.get('https://pokeapi.co/api/v2/type');

    const types = pokemonTypes.data.results.map((obj) => obj.name);

    types.forEach((tipo) => {
      Tipo.findOrCreate({
        where: { name: tipo },
      });
    });

    return types;
  } catch (e) {
    throw new Error('error L26 gettypes');
  }
};

const getTypeDb = async () => {
  try {
    const pokemonTypes = await Tipo.findAll();
    return pokemonTypes;
  } catch (e) {
    throw new Error('Error L28 gettypes');
  }
};

module.exports = { setTypes, getTypeDb };
