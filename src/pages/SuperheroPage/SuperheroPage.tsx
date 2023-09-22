import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Superhero } from '../../types/Superhero';
import { Overlay } from '../../components/Overlay';
import { Loader } from '../../components/Loader';
import { getHero } from '../../api/superheroes';
import classNames from 'classnames';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form/Form';
import { client } from '../../utils/fetchClient';

export const SuperheroPage: React.FC = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState<Superhero | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const imgs = superhero?.images.map(client.getImgUrl) || [];

  const [mainImg, setMainImg] = useState(imgs[0]);

  useEffect(() => {
    if (id) {
      getHero(id).then(setSuperhero);
    }
  }, [id])

  useEffect(() => {
    setMainImg(imgs[0]);
  }, [superhero]);

  const changeMainImgHandler = (img: string) => {
    if (img !== mainImg) {
      setMainImg(img);
    }
  };

  const handleShowForm = () => setIsEditing(true);
  const handleCloseForm = () => setIsEditing(false);

  return !superhero ? (
    <Overlay>
      <Loader />
    </Overlay>
  ) : (
    <div className='superhero'>
      {
        isEditing && (<Overlay>
          <Form closeForm={handleCloseForm} superhero={superhero}/>
        </Overlay>)
      }
      <h1 className='superhero__nickname'>{superhero.nickname}</h1>

      <section className='superhero__section'>
        <div className="superhero__imgs">
          {imgs.map((img) => (
            <button
              key={img}
              type="button"
              className={classNames('superhero__imgs-item', {
                'img-active': img === mainImg,
              })}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: '80%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => changeMainImgHandler(img)}
            />
          ))}
        </div>

        <img
          src={mainImg}
          alt={superhero.nickname}
          className="superhero__img-main"
        />

        <div className='superhero__info'>
          <h2 className='superhero__real-name'>{superhero.real_name}</h2>

          <p>{superhero.origin_description}</p>

          <ul className='superhero__superpovers'>
            {
              superhero.superpowers.map(superpower => (
                <li key={superpower}>{superpower}</li>
              ))
            }
          </ul>
          <div className='superhero__catch-phrase'>
            <h3 className='superhero__feature-title'>Catch Phrase</h3>
            <p>{superhero.catch_phrase}</p>
          </div>
        </div>
      </section>

      <div className='superhero__btns'>
          <Button
            text='EDIT'
            btnType='button'
            btnStyle='fill'
            handler={handleShowForm}
          />
        </div>
    </div>
  )
}