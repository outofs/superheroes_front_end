import { Link } from 'react-router-dom';
import { Superhero } from '../../types/Superhero'

type Props = {
  hero: Superhero;
};

export const Card: React.FC<Props> = ({ hero }) => {
  return (

    <Link to={`superhero/${hero._id}`}>
      <div className="card">
        <div className="card__wrapper">
          <div className="card__banner-image"> </div>
          <h1 className="card__title">{hero.nickname}</h1>
        </div>
        {/* <div className="card__button-wrapper">

          <button className="btn outline">DETAILS</button>
        <button className="btn fill">DELETE</button>
        </div> */}
      </div>
    </Link>
  )
}