import React, { useEffect, useState } from 'react'
import styles from "../../styles/Header.module.css"
import { ROUTES } from "../../utils/routes"
import { Link, useNavigate } from 'react-router-dom'
import LOGO from "../../images/logos1.png"
import AVATAR from "../../images/user.png"
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../../features/user/userSlice'
import { useGetProductsQuery } from '../../features/api/apiSlice'


const Header = () => {

  /* Importing hooks to setting initial values */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { currentUser, cart } = useSelector(({ user }) => user);
  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  /* Logical part of Login and Signup forms */
  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  /* Displaying form if User does not authorize */
  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  /* Set "searching value" */
  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Logitech" />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>

        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anyting..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={styles.box}>
              {" Searching with value {from uncontrolled form} "}
              {isLoading ? "Loading" : !data.length
                ? "No results"
                : data.map(({ title, images, id }) => {
                  return (
                    <Link
                      key={id}
                      onClick={() => setSearchValue("")}
                      className={styles.item}
                      to={`/products/${id}`}
                    >
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images[0]})` }}
                      />
                      <div>{title}</div>
                    </Link>
                  );
                })}
            </div>
          )}
        </form>

        {/* Link to Favourites  */}
        <div className={styles.account}>
          <Link to={ROUTES.FAVOURITE} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>

          {/* Link to Cart */}
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;