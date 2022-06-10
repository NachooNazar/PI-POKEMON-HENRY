import React from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { setTypes } from '../actions';
import s from './styles/LandingPage.module.css'

export default function LandingPage(){

    const dispatch = useDispatch();

    const handlePostTypes = (e)=>{
        dispatch(setTypes());
    }

    return(
        <div className={s.divLanding}>
            <div className={s.container}>
                <p className={s.glitch}> 
                    <span aria-hidden={true}>POKEDEX PAGE!</span>
                    POKEDEX PAGE!
                    <span aria-hidden={true}>POKEDEX PAGE!</span>
                </p>
            </div>
            
            <Link to='/home'>
            <button className={s.button} onClick={handlePostTypes()}>Ingresar</button>
            </Link>
        </div>
    )
}