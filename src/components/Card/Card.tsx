import { useContext } from "react";

import { Link } from "react-router-dom";
import { Superhero } from "../../types/Superhero"
import { client } from "../../utils/fetchClient";
import { Button } from "../Button";
import { AppContext } from "../AppContext/AppContext";
import { deleteHero } from "../../api/superheroes";

type Props = {
  hero: Superhero;
};

export const Card: React.FC<Props> = ({ hero }) => {
  const {
    setIsLoading,
    makeUpdate,
  } = useContext(AppContext);

  const deleteSuperhero = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteHero(id);
    } finally {
      makeUpdate();
      setIsLoading(false);
    }
  };

  const deleteSuperheroHandler = () => {
    deleteSuperhero(hero._id);
  }

  return (
    <div className="card">
      <div className="card__delete">
        <Button
          btnType="button"
          btnStyle="fill"
          text="X"
          handler={deleteSuperheroHandler}
        />
      </div>

      <div className="card__wrapper">
        <Link to={`superhero/${hero._id}`}>
          <div
            className="card__banner-image"
            style={{ backgroundImage: `url(${client.getImgUrl(hero.images[0])})` }}
          > </div>
          <h1 className="card__title">{hero.nickname}</h1>
        </Link>
      </div>

    </div >



  )
}