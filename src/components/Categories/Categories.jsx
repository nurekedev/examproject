import React from 'react'
import styles from "../../styles/Categories.module.css"
import { Link } from 'react-router-dom';


/* Creating component with following props */
const Categories =  ({ title, style = {}, products = [], amount })  => {

  /* Filtering by given amount */
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.section}>
    <h2>{title}</h2>

    <div className={styles.list}>
      {/* Getting categories through "map" */}
      {list.map(({ id, name, image }) => (
        <Link to={`/categories/${id}`} key={id} className={styles.item}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${image})` }}
          />
          <h3 className={styles.title}>{name}</h3>
        </Link>
      ))}
    </div>
  </section>
  )
}

export default Categories