import { GetManyResult } from '../types/GetManyResult';
import { Superhero } from '../types/Superhero';
import { client } from '../utils/fetchClient';

export const getHeroes = (page:number = 1) => {
  return client.get<GetManyResult>(`/heroes?page=${page}`);
};

export const getHero = (heroId: string) => {
  return client.get<Superhero>(`/heroes/${heroId}`);
};

export const createHero = ({
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
  images
}: Omit<Superhero, '_id'>) => {
  return client.post<Superhero>('/heroes', {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images
  });
};

export const updateTodo = ({
  _id,
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
  images
}: Superhero) => {
  return client.patch<Superhero>(`/heroes/${_id}`, {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images
  });
};

export const deleteTodo = (heroId: string) => {
  return client.delete(`/heroes/${heroId}`);
};