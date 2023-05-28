import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from "../../styles/Cart.module.css";
import { sumBy } from '../../utils/common';
import * as userActions from '../../features/user/userSlice';

/* Creating component */
const Favourite = () => {
  const { favourite } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /* Use bindActionCreators to generate action creators */
  const userActionCreators = bindActionCreators(userActions, dispatch);

  /* Getting actions from "bindActionCreators" */
  const changeQuantity = (item, quantity) => {
    userActionCreators.addItemToFavourites({ ...item, quantity });
  };
  const removeItem = (id) => {
    userActionCreators.removeItemFromFavourites(id);
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>List of Favourites</h2>

      {!favourite || favourite.length === 0 ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {favourite.map((item) => {
              const { title, category, images, price, id, quantity } = item;

              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />

                  <div className={styles.info}>
                    <div className={styles.name}>{title}</div>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.quantity}></div>

                  <div className={styles.total}>{price * quantity} ₸</div>
                  <div
                    style={{ marginLeft: 140 }}
                    className={styles.close}
                    onClick={() => removeItem(item.id)}
                  >
                    <svg className="icon">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Favourite;