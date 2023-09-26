import React, { useEffect, useState } from "react";
import { AppContextType } from "../../types/AppContextType";
import { GetManyResult } from "../../types/GetManyResult";
import { getHeroes } from "../../api/superheroes";

export const AppContext = React.createContext<AppContextType>({
  superheroes: {
    heroes: [],
    totalHeroesQuantity: 0,
  },
  isLoading: false,
  setIsLoading: () => { },
  page: 1,
  prevPage: () => { },
  nextPage: () => { },
  makeUpdate: () => { },
  update: false,
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [superheroes, setSuperheroes] = useState<GetManyResult>({
    heroes: [],
    totalHeroesQuantity: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getHeroes(page)
      .then(setSuperheroes)
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, update]);

  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    };
  };
  const nextPage = () => {
    if (page < Math.ceil(superheroes.totalHeroesQuantity / 5)) {
      setPage(prev => prev + 1);
    };
  };

  const makeUpdate = () => {
    setUpdate(val => !val);
  };

  return (
    <AppContext.Provider
      value={{
        superheroes,
        isLoading,
        setIsLoading,
        page,
        prevPage,
        nextPage,
        makeUpdate,
        update,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}