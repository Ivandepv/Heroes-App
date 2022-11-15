import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';
import './HeroScreen.css'

//import batman from '../../assets/heroes/dc-batman.jpg'

export const HeroScreen = ({history}) => {

    const {heroId} = useParams();

    const hero = useMemo(() => getHeroById(heroId), [heroId]);
    

   if(!hero){
       return <Redirect to="/" />
   }

   const handleReturn = () => {
    if(history.length <= 2) {
       hero.publisher === 'Marvel Comics' && history.push('/');
       hero.publisher === 'DC Comics' && history.push('/dc');
    } else {
      history.goBack();
    }
  }

   const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
} = hero;

// Anadir estilos y fin
    return (
        <div className="contenedor">
            <div className="contenedor-img ">
                <img 
               // src = {` /assets/heroes/${ heroId }.jpg` }  // DESDE ASSETS
                // src={batman} import
                src = {heroImages(`./${heroId}.jpg`).default }
                className="img animate__animated animate__fadeInLeft" alt={superhero}>
                </img>
            </div>
            <div className="contenedor-texto">

                <h5>{superhero}</h5>
                <span >{alter_ego}</span>

                <p className="p">{publisher}</p>
                <p><b>First appearance:</b> <br/> {first_appearance}  </p>
                { (characters !== alter_ego) && <p><b>Characters:</b> <br/>{characters}</p>}

                <button className="return" onClick={handleReturn}>Return</button>
            </div>
            

        </div>
    )
}
