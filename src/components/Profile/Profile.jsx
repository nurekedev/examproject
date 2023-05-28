import React, { useEffect, useState } from 'react'
import styles from "../../styles/Profile.module.css"

import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../features/user/userSlice'


/* Creating <Profile /> component */
const Profile = () => {

  /* Importing neccessary Hooks  */
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  /* Set initial values */
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  /* Using useEffect to update values */
  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  /* Logical part of updating values */
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };


  /* Checking values to empty */
  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <input type="name" placeholder="Your name" name="name" value={values.name} autoComplete="off" onChange={handleChange} required />
          </div>

          <div className={styles.group}>
            <input type="password" placeholder="Your password" name="password" value={values.password} autoComplete="off" onChange={handleChange} required />
          </div>

          <div className={styles.group}>
            <input type="avatar" placeholder="Your avatar" name="avatar" value={values.avatar} autoComplete="off" onChange={handleChange} required />
          </div>

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
