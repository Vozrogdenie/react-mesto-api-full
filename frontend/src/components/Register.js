import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function Register(props) {
  const { values, handleChange, setValues } = useForm({
    password: '',
    email: '',
  });
  // const [state, setState] = React.useState({
  //   password: '',
  //   email: '',
  //   message: ''
  // })

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setState({
  //     ...state,
  //     [name]: value
  //   });
  // }
  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = values;
    props.onRegister(password, email)
      .catch(err => {
        console.log(err)
        setValues({
          ...values,
          message: 'Что-то пошло не так!'
        })
      })
  }

  return (
    <div className="register login">
      <p className="register__title login__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form login__form">
        <input required id="email" name="email" placeholder="Email" className="register__input login__input" type="text" value={values.email} onChange={handleChange} />
        <input required id="password" name="password" placeholder="Пароль" className="register__input login__input" type="password" value={values.password || ''} onChange={handleChange} />
        <button type="submit" onSubmit={handleSubmit} className="register__submit-button login__submit-button">Зарегистрироваться</button>
      </form>
      <p className='register__text'>Уже зарегистрированы?
        <Link to="/signin" className="register__link"> Войти</Link></p>
    </div>
  );
}

export default Register;
