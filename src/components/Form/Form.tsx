import { Superhero } from '../../types/Superhero'

type Props = {
  superhero?: Superhero;
};

export const Form: React.FC<Props> = ({superhero}) => {

  return (
    <form className='form'>
      <input type="text" className='form__field' placeholder='Enter nickname'/>
      <input type="text" className='form__field' placeholder='Enter real name'/>
      <input type="text" className='form__field' placeholder=''/>
      <input type="text" className='form__field' placeholder=''/>
      <input type="text" className='form__field' placeholder=''/>
      <input type="text" className='form__field' placeholder=''/>
    </form>
  )
}