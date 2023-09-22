import { Link } from 'react-router-dom';
import { Superhero } from '../../types/Superhero'
import { client } from '../../utils/fetchClient';

type Props = {
  hero: Superhero;
};

export const Card: React.FC<Props> = ({ hero }) => {
  return (

    <Link to={`superhero/${hero._id}`}>
      <div className="card">
        <div className="card__wrapper">
          <div 
          className="card__banner-image" 
          style={{backgroundImage:`url(${client.getImgUrl(hero.images[0])})`}}
          > </div>
          <h1 className="card__title">{hero.nickname}</h1>
        </div>
      </div>
    </Link>
  )
}