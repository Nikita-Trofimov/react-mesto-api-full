import React from 'react';
import { Link } from 'react-router-dom';

function Register ( { onRegister } ) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt){
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email, password });
  }

  return (
    <section className="authentication">
      <form onSubmit={handleSubmit} className="authentication__form">
        <h2 className="authentication__title">Регистрация</h2>
        <input value={email} onChange={handleChangeEmail} name="email" type="email" placeholder="Email" className="authentication__input"/>
        <input value={password} onChange={handleChangePassword} 
        name="password" type="password" placeholder="Пароль" className="authentication__input" autoComplete="on" />
        <button type="submit" className="authentication__submit-button">Зарегистрироваться</button>
      </form>  
      <p className="authentication__subtitle">Уже зарегистрированы? <Link className="authentication__subtitle-link" to='/sign-in'>Войти</Link></p>
    </section>
  )
}

export default Register;