import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../../styles/Footer.module.css"
import { ROUTES } from '../../utils/routes';
import LOGO from "../../images/logos1.png"

const Footer = () => {

return (
  <section className={styles.footer}>
    <div className={styles.logo}>
      <Link to={ROUTES.HOME}>
        <img src={LOGO} alt="Logitech" />
      </Link>
    </div>

    <div className={styles.rights}>
      Developed by {""}
      <a target="_blank">
         Nurzhan
      </a>
    </div>

  </section>)
  
}

export default Footer;