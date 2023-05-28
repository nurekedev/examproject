import React, { useState } from 'react'
import styles from "../../styles/User.module.css"
import { useDispatch } from 'react-redux'
import { createUser } from '../../features/user/userSlice'


/* Creating component with following props */
const UserSignupForm = ({toggleCurrentFormType, closeForm }) => {


    /* Importing neccesay hooks ans setting initial values */
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        avatar: "",
    })

    /* Logical part of registration forms */
    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).every((val) => val);

        if (!isNotEmpty) return;

        dispatch(createUser(values))
        closeForm();

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={closeForm}>
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                </svg>
            </div>

            <div className={styles.title}>
                Sign Up
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.group}>
                    <input type="email" name="email" id="" placeholder='Enter the email' value={values.email} autoComplete='off' onChange={handleChange} required />
                </div>

                <div className={styles.group}>
                    <input type="name" name="name" id="" placeholder='Enter the name' value={values.name} autoComplete='off' onChange={handleChange} required />
                </div>

                <div className={styles.group}>
                    <input type="password" name="password" id="" placeholder='Enter the password' value={values.password} autoComplete='off' onChange={handleChange} required />
                </div>

                <div className={styles.group}>
                    <input type="avatar" name="avatar" id="" placeholder="Paste link of avatar" value={values.avatar} autoComplete='off' onChange={handleChange} required />
                </div>


                <div className={styles.link} onClick={() => toggleCurrentFormType('login')}>
                    Sign in
                </div>

                <button type="submit" className={styles.submit}>
                    Create an account
                </button>



            </form>

        </div>
    )
}

export default UserSignupForm