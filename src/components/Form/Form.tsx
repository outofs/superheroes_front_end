import { useState } from 'react';
import { Superhero } from '../../types/Superhero'
import { Button } from '../Button';

type Props = {
  superhero?: Superhero;
  closeForm: () => void;
};

interface FormErrors {
  isNicknameError: boolean;
  isRealNameError: boolean;
  isOriginDescriptionError: boolean;
  isSuperpowersError: boolean;
  isCatchPhraseError: boolean;
  isImagesError: boolean;
}

export const Form: React.FC<Props> = ({ superhero, closeForm }) => {
  const [formFields, setFormFields] = useState<Omit<Superhero, '_id'>>({
    nickname: superhero?.nickname || '',
    real_name: superhero?.real_name || '',
    origin_description: superhero?.origin_description || '',
    superpowers: superhero?.superpowers || [],
    catch_phrase: superhero?.catch_phrase || '',
    images: superhero?.images || [],
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    isNicknameError: false,
    isRealNameError: false,
    isOriginDescriptionError: false,
    isSuperpowersError: false,
    isCatchPhraseError: false,
    isImagesError: false,
  })

  const changNicknameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      nickname: event.target.value,
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isNicknameError: false,
    }));
  };

  const changeRealNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      real_name: event.target.value,
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isRealNameError: false,
    }));
  };

  const changeOriginDescriptionHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      origin_description: event.target.value,
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isOriginDescriptionError: false,
    }));
  };

  const changeSuperpowersHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      superpowers: event.target.value.split(', '),
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isSuperpowersError: false,
    }));
  };

  const changeCatchPhraseHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      catch_phrase: event.target.value,
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isCatchPhraseError: false,
    }));
  };

  const changeImagesHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      images: event.target.value.split(', '),
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isImagesError: false,
    }));
  };

  return (
    <form className='form'>
      <input
        type="text"
        className='form__field'
        placeholder='Enter nickname'
        value={formFields.nickname}
        onChange={changNicknameHandler}
      />
      <input
        type="text"
        className='form__field'
        placeholder='Enter real name'
        value={formFields.real_name}
        onChange={changeRealNameHandler}
      />
      <input
        type="text"
        className='form__field'
        placeholder='Provide description'
        value={formFields.origin_description}
        onChange={changeOriginDescriptionHandler}
      />
      <input
        type="text"
        className='form__field'
        placeholder='Enter superpowers'
        value={formFields.superpowers.join(', ')}
        onChange={changeSuperpowersHandler}
      />
      <input
        type="text"
        className='form__field'
        placeholder='Enter catch phrase'
        value={formFields.catch_phrase}
        onChange={changeCatchPhraseHandler}
      />
      <input
        type="text"
        className='form__field'
        placeholder='Choose imgs'
        value={formFields.images.join(', ')}
        onChange={changeImagesHandler}
      />
      <Button
        text={!superhero ? 'CREATE' : 'UPDATE'}
        btnStyle='fill'
        btnType='submit'
        handler={() => { }}
      />
      <Button
        text='CANCEL'
        btnStyle='outline'
        btnType='reset'
        handler={closeForm}
      />
    </form>
  )
}