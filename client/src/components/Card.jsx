import React from "react";
import s from './styles/Card.module.css'
export default function Card({name,img,type}){
    return(
        <div className={s.card}>
            <h3 className={s.name}>{name}</h3>
            
            <div>
                <img className={s.image} src={img} alt='imagen'/>
            </div>
            <div className={s.tipos}>
                {type.map((tipo)=>(<h5 className={s.tipo}>{tipo}</h5>)) }
            </div> 
        </div>
    )
}