const axios = require('axios');
const { Pokemon, Tipo } = require('../../db');

const getById = async (id) => {
  try {
    if (typeof id === 'string' && id.length > 6) {
      const db = await Pokemon.findByPk(id, { include: Tipo });
      const pokemonDb = {
        id: db.id,
        name: db.name,
        type: db.tipos.map((t) => t.name),
        img: db.img
          ? db.img
          : 'https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif',
        hp: db.hp,
        attack: db.attack,
        defense: db.defense,
        speed: db.speed,
        height: db.height,
        weight: db.weight,
      };

      return pokemonDb;
    }
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return {
      id: pokemon.data.id,
      name: pokemon.data.name,
      hp: pokemon.data.stats[0].base_stat,
      attack: pokemon.data.stats[1].base_stat,
      defense: pokemon.data.stats[2].base_stat,
      speed: pokemon.data.stats[5].base_stat,
      height: pokemon.data.height,
      weight: pokemon.data.weight,
      img: pokemon.data.sprites.other.dream_world.front_default,
      type: pokemon.data.types.map((tipo) => tipo.type.name),
    };
  } catch (e) {
    throw new Error('Server error');
  }
};

module.exports = { getById };
