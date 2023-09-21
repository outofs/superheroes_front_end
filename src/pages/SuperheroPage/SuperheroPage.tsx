import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Superhero } from '../../types/Superhero';
import { Overlay } from '../../components/Overlay';
import { Loader } from '../../components/Loader';
import { getHero } from '../../api/superheroes';

export const SuperheroPage: React.FC = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState<Superhero | null>(null);

  useEffect(() => {
    if (id) {
      getHero(id).then(setSuperhero);
    }
  }, [id])

  return !superhero ? (
    <Overlay>
      <Loader />
    </Overlay>
  ) : (
    <div className='superhero'>
      <h1 className='superhero__nickname'>{superhero.nickname}</h1>
      <img
        src={superhero.images[0]}
        alt={superhero.nickname}
        className='superhero__img'
      />

      <div className='superhero__info'>
      <h2 className='superhero__real-name'>{superhero.real_name}</h2>
        <p></p>
      </div>
      
    </div>
  )


}