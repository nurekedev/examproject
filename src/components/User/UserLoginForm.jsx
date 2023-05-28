import React, { useState } from 'react'
import styles from "../../styles/User.module.css"
import { useDispatch } from 'react-redux'
import { loginUser } from '../../features/user/userSlice'



const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {


    /* Importing neccessary Hooks and setting values */
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email: "",
        password: "",
    })

    /* Sign in Form {Uncontrolled form} */
    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isNotEmpty = Object.values(values).every((val) => val);
        if (!isNotEmpty) return;
        dispatch(loginUser(values))
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
                    <input type="password" name="password" id="" placeholder='Enter the password' value={values.password} autoComplete='off' onChange={handleChange} required />
                </div>


                <div className={styles.link} onClick={()=>toggleCurrentFormType("signup")}>
                    Create an account
                </div>

                <button type="submit" className={styles.submit}>
                    Sign in
                </button>



            </form>

        </div>
    )
}

export default UserLoginForm