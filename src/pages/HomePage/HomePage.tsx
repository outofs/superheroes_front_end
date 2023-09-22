import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Superhero } from '../../types/Superhero'
import { getHeroes } from '../../api/superheroes';
import { GetManyResult } from '../../types/GetManyResult';
import { CardList } from '../../components/CardList';
import { Pagination } from '../../components/Pagination';
import { Button } from '../../components/Button';
import { Overlay } from '../../components/Overlay';
import { Loader } from '../../components/Loader';
import { Form } from '../../components/Form/Form';

export const HomePage: React.FC = () => {
  const [superheroes, setSuperheroes] = useState<GetManyResult>({
    heroes: [],
    totalHeroesQuantity: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getHeroes(page)
      .then(setSuperheroes)
      .finally(() => setIsLoading(false));
  }, [page])

  console.log(superheroes);

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    };
  };

  const nextPageHandler = () => {
    if (page < Math.ceil(superheroes.totalHeroesQuantity / 5)) {
      setPage(prev => prev + 1);
    };
  };
  

  const handleShowForm = () => setIsCreating(true);
  const handleCloseForm = () => setIsCreating(false);


  return (
    <div className='home'>
      {isLoading && (<Overlay>
        <Loader />
      </Overlay>)}

      {isCreating && (<Overlay>
        <Form closeForm={handleCloseForm} />
      </Overlay>)}

      <div className='create__hero'>
        <Button
          btnStyle='fill'
          handler={handleShowForm}
          text='CREATE YOUR SUPERHERO'
        />
      </div>
      <CardList superheroes={superheroes.heroes} />

      {
        superheroes.totalHeroesQuantity !== 0 && (<Pagination
          currentPage={page}
          prevPage={prevPageHandler}
          nextPage={nextPageHandler}
        />)
      }
    </div>
  )
}