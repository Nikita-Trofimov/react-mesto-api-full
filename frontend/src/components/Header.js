import {Switch, Route, Link} from "react-router-dom";
function Header({userEmail, onLogOut}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route exact path="/">
            <nav className="header__authentication">
              <span className="header__email">{userEmail}</span>
              <Link to="/sign-in" onClick={onLogOut} className="header__authentication-link">Выйти</Link>  
            </nav>
        </Route>
        <Route path="/sign-up">
            <nav className="header__authentication">
              <Link to="/sign-in" className="header__authentication-link">Войти</Link>
            </nav>
        </Route>
        <Route path="/sign-in">
            <nav className="header__authentication">
              <Link to="/sign-up" className="header__authentication-link">Регистрация</Link>  
            </nav>
        </Route>
      </Switch>
    </header>    
  )
}

export default Header;