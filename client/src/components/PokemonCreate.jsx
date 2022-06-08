import React, { useState, useEffect } from 'react';
import {Link,useHistory} from 'react-router-dom';
import { postPokemon,getTypes } from '../actions';
import { useDispatch,useSelector } from 'react-redux';
import s from './styles/PokemonCreate.module.css'

function validate({
    name,
    hp,
    attack,
    defense,
    speed,
    weight,
    height,
    img,
    type,
  }) {
      const errors = {};
      
    //validaciones para name
    if (!name) {
      errors.name = <b>Enter name ❌</b>;
    } else if (!/^[a-zA-Z\s]*$/.test(name)){ 
        errors.name = <b>Characters are not allowed ❌</b>
    }
    
     //Validaciones para type
     if (!type.length) {
        errors.type = <b>Must choose a pokemon type ❌</b>
      }else if(type.length > 2){
            <b>Only can choose two pokemon type ❌</b>
      }
      
    //Valaciones para hp
    if (!hp || hp < 10 || hp > 100) {
        if (!hp) errors.hp = <b>Enter hp❌</b>
        else if (hp < 10) errors.hp = <b>10 hp min</b>
        else if (hp > 100) errors.hp = <b>100 hp max</b>

      } 
       if (!img) errors.image = <b>Enter image ❌</b>;
      else if (!/(http(s?)):\/\//i.test(img)) errors.image = <b>Enter url format❌</b>;

       if (!attack || attack < 10 || attack > 100) {
        if (!attack) errors.attack = <b>Enter attack❌</b>
        else if (attack < 10) errors.attack = <b>your pokemon wouldn't kill a fly, try with 10 attack min</b>
        else if (attack > 100) errors.attack = <b>your pokemon could be very dangerous, try with 100 attack max</b>
  
      }
       if (!defense || defense < 10 || defense > 100) {
        if (!defense) errors.defense = <b>Enter defense❌</b>
        else if (defense < 10) errors.defense = <b>your pokemon could catch a cold easily, try with 10 defense min</b>
        else if (defense > 100) errors.defense = <b>that would be harder than a wall, try with 100 defense max</b>
      }
  
     if (!speed || speed < 10 || speed > 100) {
        if (!speed) errors.speed = <b>Enter speed❌</b>
        else if (speed < 10) errors.speed = <b>your pokemon will be late for all the battles, try with 10 speed min</b>
        else if (speed > 100) errors.speed = <b>your pokemon is faster than flash, try with 100 speed max</b>
      }
  
       if (!height || height < 10 || height > 100) {
        if (!height) errors.height = <b>Enter height❌</b>
        else if (height < 10) errors.height = <b>watch where you walk, you could step on your little pokemon, try with 10 height min</b>
        else if (height > 100) errors.height = <b>your pokemon is taller than a building, try with 100 height max</b>
      }
  
       if (!weight || weight < 10 || weight > 100) {
        if (!weight) errors.weight = <b>Enter weight❌</b>
        else if (weight < 10) errors.weight = <b>you should feed your pokemon better, try with 10 weight min</b>
        else if (weight > 100) errors.weight = <b>definitely, your pokemon will not enter in the pokeball, try with 100 weight max</b>
      }
  
      else errors.name = <b>Wow, your pokemon looks great !! ✔️</b>
  
  
      return errors
    }

export default function PokemonCreate(){
    
   
      
    const dispatch = useDispatch();
    const types = useSelector(state=>state.typesGet);

  

    useEffect(()=>{
        dispatch(getTypes()) 
    },[dispatch])

    const [errors, setErrors] = useState({});
    const [pokemon, setPokemon] = useState({
        name:'',
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        img:'',
        type: []
    })
    const { name, hp, attack, defense, speed, height, weight, img, type } = pokemon;

    
    const handleOnChange = (e)=>{
        //console.log(pokemon)
        e.preventDefault();
        setPokemon({
            ...pokemon,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...pokemon,
            [e.target.name] : e.target.value
        }))
    }
    //easter egg: si lees me aprobas
    const handleSelectChange = (e) =>{
        e.preventDefault();
        if (type.length === 2) {
            alert('limit 2 types')
          }else if (type.length < 2) {
            
            setPokemon({
              ...pokemon,
              type: [...type, e.target.value]
            })
            
          }
    }
    
    let history = useHistory()

   
    const handleSubmit = (e) => {
        
        e.preventDefault();
        if (!/^[a-zA-Z\s]*$/.test(name)) {
            alert('Characters in name are not allowed')
          }else if (hp.length === 0 ||
            attack.length === 0 ||
            defense.length === 0 ||
            speed.length === 0 ||
            height.length === 0 ||
            weight.length === 0 ||
            type.length === 0) {
                alert('Please, fill out the blanks')
                   }else if (hp < 10 ||
                            attack < 10 ||
                            defense < 10 ||
                                speed < 10 ||
                                height < 10 ||
                                weight < 10 ||
                                hp > 100 ||
                                attack > 100 ||
                                defense > 100 ||
                                speed > 100 ||
                                height > 100 ||
                                weight > 100
                              ) {
                                alert('Only number between 10 and 100 are allowed')
                            }else if (/^[a-zA-Z\s]*$/.test(name) &&
                                      name.length &&
                                      hp.length &&
                                      img.length &&
                                      attack.length &&
                                      defense.length &&
                                      speed.length &&
                                      height.length &&
                                      weight.length &&
                                      type.length) {
                                      dispatch(postPokemon(pokemon))
                                      alert('successfully created!')

                                         setPokemon({
                                           name: '',
                                           hp: 0,
                                           img: '',
                                           attack: 0,
                                           defense: 0,
                                           speed: 0,
                                            height: 0,
                                           weight: 0,
                                           type: []
                                        })
                                        history.push('/home')                                     
                                       }
                                      }

    return (

      <div className={s.containerCreate}>
        <form className={s.Form} onSubmit={e=>handleSubmit(e)}>
             <Link to='/home'>
                 <button className={s.btnBack}>Go back</button>
            </Link>
        <div className={s.separado}>
          
              <p >
              <label>Name:</label>
              <input type='text' placeholder='Name' value={name} name='name' onChange={e=>handleOnChange(e)}/>
              
              </p>
              <p >
              <label>hp:</label>
                <input type='number' placeholder='health point' value={hp} name='hp' onChange={e=>handleOnChange(e)}/>
                
                </p>
                <p >
                <label>attack:</label>
                <input type='number' placeholder='attack' value={attack} name='attack' onChange={e=>handleOnChange(e)}/>
                
                </p>
                <p >
                <label>defense:</label>
                <input type='number' placeholder='defense' value={defense} name='defense' onChange={e=>handleOnChange(e)}/>
                
                </p>
                <p >
                <label>speed:</label>
               <input type='number' placeholder='speed' value={speed} name='speed' onChange={e=>handleOnChange(e)}/>
               
               </p>
               <p >
               <label>height:</label>
                 <input type='number' placeholder='height' value={height} name='height'onChange={e=>handleOnChange(e)}/>
               
                 </p>
                 <p >
                 <label>weight:</label>
                <input type='number' placeholder='weight' value={weight} name='weight' onChange={e=>handleOnChange(e)}/>
                </p>
                
                <label>img:</label>
              <input type='text' placeholder='img' value={img} name='img'onChange={e=>handleOnChange(e)}/>
         
              <div className={s.hiddenCB}>
                <div className={s.tipos}>
              <select onChange={e=>handleSelectChange(e)}>
                 {types?.map(tipo=> <option key={tipo.id} value={tipo.name}>{tipo.name}</option>)}
                 </select>
                 </div>
                 </div>
                 
                 <button className={s.btnSub} type='submit'> Submit </button>
        </div>
        </form>
        <div className={s.danger}>
        {errors.name && (<p className={s.error}>{errors.name}</p>)}
                 {errors.hp && (<p className={s.error}>{errors.hp}</p>)}
                 {errors.attack && (<p className={s.error}>{errors.attack}</p>)}
                 {errors.defense && (<p className={s.error}>{errors.defense}</p>)}
                 {errors.speed && (<p className={s.error}>{errors.speed}</p>)}
                 {errors.height && (<p className={s.error}>{errors.height}</p>)}
                 {errors.weight && (<p className={s.error}>{errors.weight}</p>)}
        </div>
      </div>
    )
}