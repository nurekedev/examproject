import React from 'react'
import styles from "../../styles/Home.module.css"
import bannerImg from "../../images/bf.jpg"


/* Part of Home component */
const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.left}>
                <p className={styles.content}>
                    BLACK FRIDAY
                    <span>SALES</span>
                </p>
                <button className={styles.more}>more</button>

            </div>
            <div className={styles.right} style={{ backgroundImage: `url(${bannerImg})` }}>
                <p className={styles.discount}>
                    save up to <span>50%</span> off
                </p>
            </div>
        </section>

    )
}

export default Banner