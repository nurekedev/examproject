import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {

  /* Importning Hooks to further using */
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, related } = useSelector(({ products }) => products);

  // ComponentDidMount equivalent
  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  // ComponentDidUpdate equivalent for redirection
  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      console.log('Redirecting to home');
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  // ComponentDidUpdate equivalent for fetching related products
  useEffect(() => {
    if (!data || !list.length) return;

    console.log('Fetching related products');
    dispatch(getRelatedProducts(data.category.id));

    return () => {
      console.log('Cleanup related products');
    };
  }, [data, dispatch, list.length]);

  return !data ? (
    <section>Loading</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products: " />
    </>
  );
};

export default SingleProduct;
