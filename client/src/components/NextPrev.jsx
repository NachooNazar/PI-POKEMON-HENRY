import React from 'react';

export default function NextPrev({pokemonsByPage,allPokemons,paginado,currentPage}){
     
    const cantPages= Math.ceil(allPokemons.length/pokemonsByPage);
    
    return(
        <nav>

            <button disabled={currentPage===1 ? true : false } onClick={()=>paginado(currentPage-1)}>Prev</button>
            <button disabled={currentPage===cantPages ? true  :false  } onClick={()=>paginado(currentPage+1)}>Next</button>
            
        </nav>
    )
}
