import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading'
import { getPokemonsById, getClean, deletePokemon} from "../actions";
import s from './styles/Details.module.css'
export default function PokemonDetail(){
   
    
    const dispatch = useDispatch(); 
    const {id} = useParams();

    useEffect(() => {
       dispatch(getPokemonsById(id));
        dispatch(getClean());
      }, [dispatch,id])
      
      const handleClickDelete = ()=>{
        dispatch(deletePokemon(id));
      }

      const pokemon = useSelector((state)=>state.detail)
    return (
        <div className={s.Details}>
            
            {pokemon.type?.length>0 ?
            
            <div className={s.rectangulo}>
            <h1 className={s.pokemonName}>{pokemon.name}</h1>
            <div>
            <img className={s.image} src={pokemon.img} alt='imagen'/>
            </div>
            <div> 
            
                <div>
                    <span className={s.id}>N:</span>
                    <span className={s.pokemonId}>{pokemon.id}</span>
                </div>
                <div>
                    <span className={s.hp}>Hp</span>
                    <span className={s.pokemonHp}>{pokemon.hp}</span>
                </div>
                <div>
                    <span className={s.speed}>Speed</span>
                    <span className={s.pokemonSpeed}>{pokemon.speed}</span>
                </div>
                <div>
                    <span className={s.defense}>Defense</span>
                    <span className={s.pokemonDefense}>{pokemon.defense}</span> 
                </div>
                <div>
                    <span className={s.attack}>Attack</span>
                    <span className={s.pokemonAttack}>{pokemon.attack}</span>
                </div>
                <div>
                    <span className={s.height}>Height</span>
                    <span className={s.pokemonHeight}>{pokemon.height}</span>
                </div>
                <div>
                    <span className={s.weight}>Weight</span>
                    <span className={s.pokemonWeight}>{pokemon.weight}</span>
                </div>

                <div className={s.pokeTypes}>
                 {pokemon.type?.map(el=><p className={s.pokemonTipos}>{el}</p>)} 
                 </div>
                 <Link exact to='/home'>
                    <button className={s.btnBack}>Go home</button>
                 </Link>
            </div>
            {pokemon.id.length > 6 &&  
            <Link exact to='/home'>
                <button className={s.btnBack} onClick={handleClickDelete}>Delete</button>
            </Link>}
           
            </div>: <Loading/>}
            
        </div>
    )
}