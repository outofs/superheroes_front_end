import { GetManyResult } from "./GetManyResult";

export interface AppContextType {
  superheroes: GetManyResult;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  page: number;
  prevPage: () => void;
  nextPage: () => void;
  makeUpdate: () => void;
  update: boolean;
};