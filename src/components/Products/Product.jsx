import React, { useEffect, useState } from 'react'
import styles from "../../styles/Product.module.css";
import { ROUTES } from '../../utils/routes';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart, addItemToFavourites } from '../../features/user/userSlice';





const SIZES = [4, 4.5, 5];

/* Creating component with props item */
const Product = (item) => {

    /* Destructing props */
    const { title, price, images, description } = item

    /* Set of Hooks */
    const dispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState();
    const [currentSize, setcurrentSize] = useState();

    useEffect(()=>{
        if(!images.length) return;
        setCurrentImage(images[0])
    }, [images])


    /* Dispatching methods from userSlice */
    const addToCart = () =>{
        dispatch(addItemToCart(item))
    }
    const addToFavourites = () =>{
        dispatch(addItemToFavourites(item))
    }
    
    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div className={styles.current} style={{ backgroundImage: `url(${currentImage})` }} />
                <div className={styles["images-list"]}>

                    {/* Changing images usinf useState */}
                    {images.map((image, i) => (
                        <div key={i} className={styles.image} style={{ backgroundImage: `url(${image})` }} onClick={() => setCurrentImage(image)} />
                    ))}

                </div>
            </div>

            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>{price}₸</div>
                <div className={styles.color}>
                    <span>Color: </span> Green
                </div>

                <div className={styles.sizes}>
                    <span>Sizes: </span>
                    <div className={styles.list}>
                        {SIZES.map(size => (
                            <div onClick={() => setcurrentSize(size)} className={`${styles.size} ${currentSize === size ? styles.active : ""}`}  key={size}>
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                <p className={styles.description}>{description}</p>

                <div className={styles.actions}>
                    {/* Appropriation functions to buttons */}
                    <button onClick={addToCart} className={styles.add} disabled={!currentSize}> Add to cart</button>
                    <button onClick={addToFavourites} className={styles.favourites }> Add to favourites</button>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.purchase}> 10 people purchased</div>
                    <Link to={ROUTES.HOME}>Return to store</Link>
                </div>

            </div>

        </section>
    )
}

export default Product