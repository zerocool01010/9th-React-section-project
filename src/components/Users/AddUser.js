import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const nameInputRef = useRef() //el ref me conecta con un elemento como el input que recibe el valor de la constante mas abajo en el attr ref
  const ageInputRef = useRef()

  /* const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState(''); */
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(nameInputRef); //podremos ver el contenido DOM del input al que hacemos ref
    console.log(nameInputRef.current.value); //y podemos acceder a los valores del json al que hacemos ref

    const enteredInputName = nameInputRef.current.value
    const enteredInputAge = ageInputRef.current.value

    if (enteredInputName.trim().length === 0 || enteredInputAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredInputAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredInputName, enteredInputAge);
    /* setEnteredUsername('');
    setEnteredAge(''); */
    nameInputRef.current.value = '' //usamos esta alternativa que es algo asi como manipular el DOM para resetear el valor de los inputs en lugar de usar los States de arriba que dependen de mas codigo
    ageInputRef.current.value = '' //pero no siempre es recomendable jugar asi con el DOM, es algo que hay que ver que conviene, si mas codigo y menos manipulacion, o menos codigo y mas manipulacion
  };

  /* const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  }; */

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            /* value={enteredUsername}
            onChange={usernameChangeHandler} */
            ref={nameInputRef} 
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            /* value={enteredAge}
            onChange={ageChangeHandler} */
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
