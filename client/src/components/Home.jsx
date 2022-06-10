import React from "react";
import { useEffect,useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { filterByType, getPokemons,getTypes,filterCreated,orderByName, orderByAttack } from "../actions";
import {NavLink} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import s from './styles/Home.module.css'
import NextPrev from "./NextPrev";

export default function Home(){

    //Contaste para despachar acciones
    const dispatch = useDispatch(); 
    const [order,setOrder] = useState('');
    //Me traigo todos los pokemons SEGUN EL DISPATCH | cada vez que se renderiza Home
    useEffect(()=>{
        dispatch(getPokemons());  
        dispatch(getTypes());
    },[dispatch])

      // Es lo mismo que hacer mapStateToProps || traeme todo lo que esta en el state.pokemons
      const allPokemons = useSelector((state)=>state.pokemons) 
      const allTypes = useSelector((state)=>state.typesGet)

    //Manejo el click para volver a cargar todos los pokemons, por si hay algun bug
    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(getPokemons());
    }

    //ESTADOS PARA PAGINADO
    //EJ: lastPokemonInPage = 1*12 = 12 
    //firstPokemonInPage = 12-12 = 0
    //current agarra desde la pos 0 hasta la 12
    //PAG 
    //1 ----0----12
    //2 ----13---25
    //3 ----26---38
    //4 ----39---40

    const [currentPage, setCurrentPage] = useState(1); //Me guardo la pagina actual, siempre empezamos desde la 1
    const [pokemonsByPage, setPokemonsByPage] = useState(12);//Seteo la cantidad de pokemons que va a haber por pagina
    const lastPokemonInPage = currentPage * pokemonsByPage;//Calculo el index del ultimo pokemon y del primero
    const firstPokemonInPage = lastPokemonInPage - pokemonsByPage;
    const currentPokemons = allPokemons?.slice(firstPokemonInPage,lastPokemonInPage);//Le digo que a currentPokemons que agarre de allPokemons desde
    // el primer pokemon hasta el ultimo calculado segun index

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    //FILTRO POR TIPO-------------------------------------------------
    const handleTypeFilter = (e)=>{
        e.preventDefault();
       dispatch(filterByType(e.target.value));
       setCurrentPage(1);
    }

    //FILTRO POR API O CREADO-----------------------------------------
    const handleFilterCreated = (e)=>{
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }

    //ORDER BY ATTACK-------------------------------------------------
        const handleOrderByAttack = (e)=>{
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    //ORDER BY NAME---------------------------------------------------
    const handleOrderByName = (e)=>{
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }
    
    return(
        <div className={s.home}>
            <NextPrev pokemonsByPage={pokemonsByPage} allPokemons={allPokemons} paginado={paginado} currentPage={currentPage} />
            <NavLink  to='/pokemons'>
                <button className={s.linkPokemon}>Create pokemon</button>
                </NavLink>
            <button className={s.btnReload} onClick={e=>handleClick(e)}>
               Reload Pokemons
            </button>
              <div className={s.selects}>
                <select className={s.orderAndFilter} onChange={e=>handleOrderByName(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select className={s.orderAndFilter}  onChange={e=>handleOrderByAttack(e)}>
                    <option value='fuer-asc'>Ascending attack</option>
                    <option value='fuer-desc'>Descending attack</option>
                </select>
                <select className={s.orderAndFilter} onChange={e=>handleTypeFilter(e)}>
                    <option value='' disabled selected >Filter by type</option>
                    <option value='todos'>All</option>
                    {allTypes && allTypes.map((tipo)=>(
                    <option key={tipo.id} value={tipo.name}> {tipo.name} </option>
                    ))}
                </select>

                <select className={s.orderAndFilter} onChange={e=>handleFilterCreated(e)}> 
                    <option value='' disabled selected >Created by</option>
                    <option value='todos'>All</option>
                    <option value='nosotros'>Data Base</option>
                    <option value='api'>Api</option>
                </select>
                </div>
                <div className={s.paginado}>
                    
            <Paginado  pokemonsByPage={pokemonsByPage} allPokemons={allPokemons} paginado={paginado} currentPage={currentPage} />
            </div>
            <SearchBar/>
            
                <div className={s.divCard}>
                    
                {currentPokemons.length >0 ? currentPokemons?.map(pokemon=>(
            <NavLink key={pokemon.id}  to={`/pokemons/${pokemon.id}`}>
                <Card name={pokemon.name} img={pokemon.img} type={pokemon.type} />
            </NavLink>
    
    )) : <Loading className={s.loadersito}/>}
                </div>
        </div>
    )
}

