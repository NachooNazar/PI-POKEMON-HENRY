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
                    <span className={s.titleLading}>POKEDEX PAGE!</span>
                    <p className={s.ParrafoLanding}>This an individual project, made by my self for soyHenry bootcamp a pokemon page, go in and enjoy</p>
                    <p className={s.ParrafoLanding}>The page has filters, sorts, search bar, option to create your own pokemon</p>
            </div>
            <Link to='/home'>
            <button className={s.button} onClick={handlePostTypes()}>Start Game!</button>
            </Link>
            
        </div>
    )
}