import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import styles from '../../styles/Category.module.css';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

/* Creating component with following props */
const Category = () => {

  /* Importing neccessay values to further usages*/
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  /* Set initial values to labels */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues = {
    title: '',
    price_min: 0,
    price_max: 0,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  /* Setting default values to states */
  const [isEnd, setEnd] = useState(false);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

  /* Demonstrating lifecycle steps */
  /* componentDidMount and componentDidUpdate equivalent for id change */
useEffect(() => {
  if (!id) return;

  setValues(defaultValues);
  setItems([]);
  setEnd(false);
  setParams({ ...defaultParams, categoryId: id });

  // console.log('Component mounted/updated with new id:', id);

  return () => {
    // console.log('Component unmounted');
  };
}, [id]);




  /* Logical part of Paging */
  useEffect(() => {
    if (isLoading) return;

    if (!data.length) return setEnd(true);

    setItems((_items) => [..._items, ...data]);

    console.log('Fetched new data:', data);
  }, [data, isLoading]);

  /* Changing category by Id*/
  useEffect(() => {
    if (!id || !list.length) return;

    const category = list.find((item) => item.id === id * 1);

    setCat(category);

    console.log('Category changed:', category);
  }, [list, id]);

  /* Setting values through "Uncontrolled form" */
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  /* Submit changes */
  const handleSubmit = (e) => {
    e.preventDefault();

    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, ...values });

    console.log('Form submitted with values:', values);
  };

  /* Reset valus from filter */
  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setEnd(false);

    console.log('Form reset');
  };

  return (
      <section className={styles.wrapper}>
        <h2 className={styles.title}>{cat?.name}</h2>

        <form className={styles.filters} onSubmit={handleSubmit}>
          <div className={styles.filter}>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Product name"
              value={values.title}
            />
          </div>
          <div className={styles.filter}>
            {/* On change properties */}
            <input
              type="number"
              name="price_min"
              onChange={handleChange}
              placeholder="0"
              value={values.price_min}
            />
            <span>Price from</span>
          </div>
          <div className={styles.filter}>
            <input
              type="number"
              name="price_max"
              onChange={handleChange}
              placeholder="0"
              value={values.price_max}
            />
            <span>Price to</span>
          </div>

          <button type="submit" hidden />
        </form>

        {isLoading ? (
          <div className="preloader">Loading...</div>
        ) : !isSuccess || !items.length ? (
          <div className={styles.back}>
            <span>No results</span>
            <button onClick={handleReset}>Reset</button>
          </div>
        ) : (
          <Products
            title=""
            products={items}
            style={{ padding: 0 }}
            amount={items.length}
          />
        )}

        {!isEnd && (
          <div className={styles.more}>
            <button
              onClick={() =>
                setParams({ ...params, offset: params.offset + params.limit })
              }
            >
              See more
            </button>
          </div>
        )}
      </section>
    );
};

export default Category;
