import React from 'react';
import { Button } from '../Button';
type Props = {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  nextPage,
  prevPage,
}) => {

  return (
    <div className='pagination'>
      <Button btnStyle='fill' text='PREV PAGE' handler={prevPage} />
      <span>{currentPage}</span>
      <Button btnStyle='fill' text='NEXT PAGE' handler={nextPage} />
    </div>
  );
};