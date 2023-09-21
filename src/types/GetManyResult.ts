import { Superhero } from './Superhero';

export interface GetManyResult {
  heroes: Superhero[];
  totalHeroesQuantity: number,
}