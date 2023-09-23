import { Superhero } from "../../types/Superhero";
import { Card } from "../Card/Card";

type Props = {
  superheroes: Superhero[];
};

export const CardList: React.FC<Props> = ({ superheroes }) => {
  return (
    <ul className="card__list">
      {superheroes.map((hero) => (
        <Card
          key={hero._id}
          hero={hero}
        />
      ))}
    </ul>
  );
};
