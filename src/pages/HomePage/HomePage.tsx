import React, { useState, useContext } from "react"
import { CardList } from "../../components/CardList";
import { Pagination } from "../../components/Pagination";
import { Button } from "../../components/Button";
import { Overlay } from "../../components/Overlay";
import { Loader } from "../../components/Loader";
import { Form } from "../../components/Form/Form";
import { AppContext } from "../../components/AppContext/AppContext";

export const HomePage: React.FC = () => {
  const {
    superheroes,
    isLoading,
    page,
    prevPage,
    nextPage,
  } = useContext(AppContext);

  const [isCreating, setIsCreating] = useState(false);

  const handleShowForm = () => setIsCreating(true);
  const handleCloseForm = () => setIsCreating(false);

  const prevPageHandler = () => prevPage();
  const nextPageHandler = () => nextPage();


  return (
    <div className="home">
      {isLoading && (<Overlay>
        <Loader />
      </Overlay>)}

      {isCreating && (<Overlay>
        <Form closeForm={handleCloseForm} />
      </Overlay>)}

      <div className="create__hero">
        <Button
          btnStyle="fill"
          handler={handleShowForm}
          text="CREATE YOUR SUPERHERO"
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