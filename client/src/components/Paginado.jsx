import React from "react";
import s from './styles/Paginado.module.css'

export default function Paginado({pokemonsByPage,allPokemons,paginado}){
    const numbersOfPages = [];

    //Este math.ceil me da 4 porque hace 40/12
    //Me da la cantidad de paginas que necesito
    //y en numbersOfPages se pushea 1 - 2 - 3 - 4
    for(let i =0 ; i<Math.ceil(allPokemons.length/pokemonsByPage);i++){
        numbersOfPages.push(i+1);
    }
   
    return(
        <nav>
            <ul className={s.paginado}>
                {numbersOfPages && numbersOfPages.map(number=> (
                <li className={s.number} key={number}>
                    <button className={s.btn} onClick={()=>paginado(number)}>{number}</button>
                </li>
                ))}
               
            </ul>
        </nav>
    )
}