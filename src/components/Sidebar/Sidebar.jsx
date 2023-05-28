import React from 'react'
import styles from "../../styles/Sidebar.module.css";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Sidebar = () => {

  /* Importing neccessay Hooks */
  const { list } = useSelector(({ categories }) => categories)


  return (
    <section>
      <div className={styles.sidebar}>
        <div className={styles.title}>
          CATEGORIES
        </div>
        <nav>
          <ul className={styles.menu}>
            {list.map(({ id, name }) => (
              <li key={id}>

                {/* Getting values from API */}
                <NavLink 
                className={({isActive}) => `${styles.link} ${isActive ? styles.active : ""}`}
                to={`/categories/${id}`}>
                  {name}
                </NavLink>
              </li>))}
          </ul>
        </nav>

        <div className={styles.footer}>

        </div>
      </div>
    </section>
  )
}

export default Sidebar