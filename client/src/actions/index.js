import axios from 'axios';

export function getPokemons() {
  return function (dispatch) {
    axios.get('http://localhost:3001/pokemons').then((pokemons) =>
      dispatch({
        type: 'GET_POKEMONS',
        payload: pokemons.data,
      })
    );
  };
}

export function setTypes() {
  return function (dispatch) {
    axios.post('http://localhost:3001/types').then((types) =>
      dispatch({
        type: 'SET_TYPES',
        payload: types.data,
      })
    );
  };
}

export function getTypes() {
  return function (dispatch) {
    axios.get('http://localhost:3001/types').then((types) =>
      dispatch({
        type: 'GET_TYPES',
        payload: types.data,
      })
    );
  };
}
export function postPokemon(pokemon) {
  return function () {
    axios.post('http://localhost:3001/pokemons', {
      ...pokemon,
    });
  };
}

export function filterByType(payload) {
  //console.log(payload, ' filter type');
  return {
    type: 'BY_TYPE',
    payload,
  };
}

export function filterCreated(payload) {
  //console.log(payload, 'filter created');
  return {
    type: 'FILTER_CREATED',
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: 'ORDER_ATTACK',
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload,
  };
}

export function getPokemonsById(id) {
  return (dispatch) => {
    try {
      axios.get(`http://localhost:3001/pokemons/${id}`).then((pokemon) =>
        dispatch({
          type: 'GET_POKEMON_BY_ID',
          payload: pokemon.data,
        })
      );
    } catch (error) {
      console.log(error, 'L86  ID POKEMON');
    }
  };
}

export function getClean() {
  return {
    type: 'GET_CLEAN',
    payload: [],
  };
}

export function getPokemonsName(payload) {
  return (dispatch) => {
    try {
      axios
        .get(`http://localhost:3001/pokemons?name=${payload}`)
        .then((pokemon) =>
          dispatch({
            type: 'GET_POKEMONS_NAME',
            payload: pokemon.data,
          })
        );
    } catch (er) {
      console.log(er, 'L101 SEARCH BAR NAME POKEMON');
    }
  };
}
