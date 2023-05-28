import React from 'react'
import styles from "../../styles/Home.module.css"
import BG from "../../images/wmouse.png"


const Poster = () => {
    return (
    <section className={styles.home}>
        <div className={styles.title}>BIG SALE 30%</div>
        <div className={styles.product}>
            <div className={styles.text}>
                <div className={styles.subtitle}>The bestseller of 2023</div>
                <h1 className={styles.head}>Logitech Mouse G102</h1>
            </div>
            <div className={styles.image}> 
            <img src={BG} alt="" />
            </div>
        </div>

    </section>)
}

export default Poster