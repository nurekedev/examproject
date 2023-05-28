import React, { useEffect } from 'react'
import Poster from '../Poster/Poster'
import Products from '../Products/Products'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../Categories/Categories'
import Banner from '../Banner/Banner'
import { filterByPrice } from '../../features/products/productsSlice'



const Home = () => {

  /* Importing neccessary Hooks */
  const dispatch = useDispatch();
  const {  products: { list, filtered }, categories} = useSelector((state) => state);

  /* Importing "filterByPrice" method */
  useEffect(() => {
    if (!list.length) return;

    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less than 100$" />
    </>
  );
};

export default Home;