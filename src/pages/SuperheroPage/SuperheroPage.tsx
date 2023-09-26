import React, { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { Superhero } from "../../types/Superhero";
import { Overlay } from "../../components/Overlay";
import { Loader } from "../../components/Loader";
import { getHero } from "../../api/superheroes";
import classNames from "classnames";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form/Form";
import { AppContext } from '../../components/AppContext/AppContext';

export const SuperheroPage: React.FC = () => {
  const { id } = useParams();
  const {update} = useContext(AppContext);

  const [superhero, setSuperhero] = useState<Superhero | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [mainImg, setMainImg] = useState(superhero?.images[0]);

  useEffect(() => {
    if (id) {
      getHero(id).then(setSuperhero);
    }
  }, [id, update])

  useEffect(() => {
    setMainImg(superhero?.images[0]);
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
    isEditing ? (<Overlay>
      <Form closeForm={handleCloseForm} superhero={superhero} />
    </Overlay>) : (
      <div className="superhero">

        <h1 className="superhero__nickname">{superhero.nickname}</h1>

        <section className="superhero__section">
          <div className="superhero__imgs">
            {superhero?.images.map((img) => (
              <button
                key={img}
                type="button"
                className={classNames("superhero__imgs-item", {
                  "img-active": img === mainImg,
                })}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "80%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
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

          <div className="superhero__info">
            <h2 className="superhero__real-name">{superhero.real_name}</h2>

            <div className='superhero__info-block'>
              <h3 className="superhero__info-title">Origin decription</h3>
              <p className="superhero__desc">{superhero.origin_description}</p>
            </div>

            <div className='superhero__info-block'>
              <h3 className="superhero__info-title">Superpowers</h3>
              <ul className="superhero__superpowers">
                {
                  superhero.superpowers.map(superpower => (
                    <li
                      key={superpower}
                      className="superhero__superpower"
                    >
                      {superpower}
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="superhero__info-block">
              <h3 className="superhero__info-title">Catch Phrase</h3>
              <p>{superhero.catch_phrase}</p>
            </div>
          </div>
        </section>

        <div className="superhero__btns">
          <Button
            text="EDIT"
            btnType="button"
            btnStyle="fill"
            handler={handleShowForm}
          />

          <Link to="/">
            <Button
              text="BACK TO HOME"
              btnType="button"
              btnStyle="fill"
              handler={() => { }}
            />
          </Link>

        </div>
      </div>
    )

  )
}