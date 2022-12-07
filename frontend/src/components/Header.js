import React from 'react';
import { Link } from 'react-router-dom';
import headLogo from '../images/Mesto.png'

function Header(props) {

    return (
        <header className="header">
            <img className="header__logo" src={headLogo} alt="Логотип" />
            <div className='header__block'>
                {props.loggedIn && <div className='header__title'>{props.userData.email}</div>}
                <Link to={props.path} type='button' className="header__link" onClick={props.onLogout}> {props.link}</Link>
            </div>
        </header>
    );
}

export default Header