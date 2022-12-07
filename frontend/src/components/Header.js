import React from 'react';
import headLogo from '../images/Mesto.png'

class Header extends React.Component{
    constructor(props) {
        super(props);
    }

render() {
    return (
    <div className="header"> 
        <img className="header__logo" src={headLogo} alt="Логотип"/>
    </div>
    );
  }
}

export default Header