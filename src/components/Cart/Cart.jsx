import React from 'react';
import { sumBy } from '../../utils/common';
import withCart from './withCart';
import styles from '../../styles/Cart.module.css';


/* Creating Cart component with props follow props */
const Cart = ({ cart, changeQuantity, removeItem }) => {

  /* Logical part of putting items to "Cart" */
  const renderCartItems = () => {

    /* Condition to manage "Cart" */
    if (!cart.length) {
      return <div className={styles.empty}>Here is empty</div>;
    
    }

    return (
      <div className={styles.list}>

        {/* Using map to create new array to store new values */}
        {cart.map((item) => {

          // {/* Destruction elems to "item" */}
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

              <div className={styles.price}>{price} ₸</div>

              
              <div className={styles.quantity}>

                {/* Logical part of decrement of quantity with onClick */}
                <div
                  className={styles.minus}
                  onClick={() =>
                    changeQuantity(item, Math.max(1, quantity - 1))
                  }
                >
                  <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
                  </svg>
                </div>

                <span>{quantity}</span>

                {/* Logical part of increment of quantity with onClick */}
                <div
                  className={styles.plus}
                  onClick={() =>
                    changeQuantity(item, Math.max(1, quantity + 1))
                  }
                >
                  <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
                  </svg>
                </div>
              </div>

              <div className={styles.total}>{price * quantity} ₸</div>

              <div className={styles.close} onClick={() => removeItem(item.id)}>
                <svg className="icon">
                  <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /* Slice of function to determine total sum */ 
  const totalAmount = sumBy(
    cart.map(({ quantity, price }) => quantity * price)
  );

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>
      {renderCartItems()}
      {cart.length > 0 && (
        <div className={styles.actions}>
          <div className={styles.total}>
            TOTAL: <span>{totalAmount}₸</span>
          </div>
          <button className={styles.proceed}>Proceed to checkout</button>
        </div>
      )}
    </section>
  );
};

/* Using HOC to break Cart into 2 parts */
export default withCart(Cart);
