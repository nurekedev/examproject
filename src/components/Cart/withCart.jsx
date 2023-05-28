import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from "../../features/user/userSlice";


/* Second part of HOC */
const withCart = (CartActionsComponent) => {

  return () => {

    /* Redux Hooks*/
    /* Query to eject cart from user */
    const { cart } = useSelector(({ user }) => user);
    const dispatch = useDispatch();

    /* Union actions to <mapDispatchToProps> */
    const mapDispatchToProps = {

      /* Actions with cart elements */
      changeQuantity: (item, quantity) => dispatch(addItemToCart({ ...item, quantity })),
      removeItem: (id) => dispatch(removeItemFromCart(id)),
    };

    return (
      /* Using spread operators to pass data */
      <CartActionsComponent cart={cart} {...mapDispatchToProps} />
    );
  };
};

export default withCart;
