import { GetManyResult } from "../types/GetManyResult";
import { Superhero } from "../types/Superhero";
import { client } from "../utils/fetchClient";

export const getHeroes = (page:number = 1) => {
  return client.get<GetManyResult>(`/heroes?page=${page}`);
};

export const getHero = (heroId: string) => {
  return client.get<Superhero>(`/heroes/${heroId}`);
};

export const createHero = (data: FormData) => {
  return client.post<Superhero>("/heroes", data);
};

export const updateHero = (id: string, data: FormData) => {
  return client.patch<Superhero>(`/heroes/${id}`, data);
};

export const deleteHero = (heroId: string) => {
  return client.delete(`/heroes/${heroId}`);
};