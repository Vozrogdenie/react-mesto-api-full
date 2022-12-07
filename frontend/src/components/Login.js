import React from "react";
import { useForm } from "../hooks/useForm";

function Login(props) {
  const {values, handleChange, setValues} = useForm({
    password: '',
    email: '',
  }); 
  
  function handleSubmit(e) {
    e.preventDefault()
    const { password, email } = values;
    if (!password || !email) return;
    props.onLogin(password, email)
      .catch(err => {
        console.log(err)
        setValues({
          ...values,
          messange: 'Что-то пошло не так'
        })
      })
  }

  return (
    <div className="login">
      <p className="login__title">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input required id="email" name="email" placeholder="Email" className="login__input login__input_value_name" type="text" value={values.email} onChange={handleChange} />
        <input required id="password" name="password" placeholder="Название" className="login__input login__input_value_password" type="password" value={values.password || ''} onChange={handleChange} />
        <button type="submit" className="login__submit-button">Войти</button>
      </form>
    </div>
  )
}

export default Login;