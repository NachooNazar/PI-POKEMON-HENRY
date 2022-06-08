const { default: axios } = require('axios');
const { Tipo } = require('../../db');

const setTypes = async () => {
  try {
    const pokemonTypes = await axios.get('https://pokeapi.co/api/v2/type');
    // const types = pokemonTypes.data.map
    // console.log(pokemonTypes, ' poketypes');
    const types = pokemonTypes.data.results.map((obj) => obj.name);

    // console.log(types);
    types.forEach((tipo) => {
      Tipo.findOrCreate({
        where: { name: tipo },
      });
    });
    //console.log(types);
    return types;
  } catch (e) {
    throw new Error('error L26 gettypes');
  }
};

const getTypeDb = async () => {
  try {
    const pokemonTypes = await Tipo.findAll();
    //console.log(pokemonTypes);
    //pokemonTypes.sort((a, b) => a.id > b.id);
    return pokemonTypes;
  } catch (e) {
    throw new Error('Error L28 gettypes');
  }
};

module.exports = { setTypes, getTypeDb };
