import { useRef, useState } from 'react';
import classes from './auth-form.module.css';
import { useContext } from 'react';
import { Context } from '../../context/context';
import { useRouter } from 'next/router';

function AuthForm() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [isLogin, setIsLogin] = useState(true);
  const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = useContext(Context)
  const [error, setError] = useState(null);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError(null)
    signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then(authUser => {
        router.push('/profile');
      })
      .catch(error => {
        setError(error.message)
      });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError(null)
    createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then(authUser => {
        router.push("/profile");
      })
      .catch(error => {
        setError(error.message)
      });
  };

  return (
    <section className={classes.auth}>
      <p style={{ color: "white" }}>{error}</p>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button onClick={isLogin ? loginUser : registerUser}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
