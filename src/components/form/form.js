import { useState } from 'react';
import { links } from '../../api/functions';

import './form.scss';

function Form({isLoggedIn, inputData, setInputData}) {
  const [userLink, setUserLink] = useState('');

  function changeHandler(evt) {
    setUserLink(evt.target.value);
  }

  function linkCreation(evt) {
    evt.preventDefault();
    if (isLoggedIn) {
      const token = localStorage.getItem('jwt');
      links.generation(userLink, token)
        .then((res) => {
          setInputData([...inputData, res]);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  };

  return (
    <div className='form'>
        <form className='form__form' onSubmit={ linkCreation }>
          <input className='form__input' type='text' placeholder='Вставьте ссылку' required name='link' onChange={ changeHandler }/>
          <button className='form__btn' type='submit'>Добавить</button>
        </form>
    </div>
  );
}

export default Form;