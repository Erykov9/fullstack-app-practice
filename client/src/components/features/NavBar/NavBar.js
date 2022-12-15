import styles from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const location = window.location.href.split('/')[3];
  const [isActive, setIsActive] = useState(location);

  const activeHandler = (e) => {
    setIsActive(e.target.href.split('/')[3])
  }

  return(
    <div className={styles.root}>
      <div className={styles.root__nav_title}>
        <h3>ADVERTISEMENT WEBSITE</h3>
      </div>
      <div className={styles.root__nav_links}>
        <ul>
          <li className={isActive == '' ? styles.active : ''} onClick={activeHandler}><NavLink to="/">HOME</NavLink></li>
          <li className={isActive == 'about' ? styles.active : ''} onClick={activeHandler}><NavLink to="/about">ABOUT</NavLink></li>
          <li className={isActive == 'contact' ? styles.active : ''} onClick={activeHandler}><NavLink to="/contact">CONTACT</NavLink></li>
        </ul>
        <ul>
          <li className={isActive == 'signin' ? styles.active : ''} onClick={activeHandler}><NavLink to="/signin">SIGN IN</NavLink></li>
          <li className={isActive == 'signup' ? styles.active : ''} onClick={activeHandler}><NavLink to="/signup">SIGN UP</NavLink></li>
        </ul>
      </div>
    </div>
  )
};

export default NavBar;