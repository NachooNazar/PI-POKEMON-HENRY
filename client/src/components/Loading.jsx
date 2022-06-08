import React from 'react'
import s from './styles/Loading.module.css'
export default function Loading(){
    return(
        <div className={s.loader}>
        <div className={s.pokemon}></div>
        </div>
        )
}