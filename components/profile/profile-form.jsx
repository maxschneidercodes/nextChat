import { Fragment, useRef, useState } from 'react';
import classes from './profile-form.module.css';

import { useContext } from 'react';
import { Context } from '../../context/context';

function ProfileForm() {
  const { resetPassword } = useContext(Context)
  const passwordRef = useRef()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null)
    resetPassword(passwordRef.current.value)
      .then(authUser => {
        setSuccess(true)
      })
      .catch(error => {
        setSuccess(false)
        setError(error.message)
      });
  };

  return (
    <Fragment>
      <p>{error}</p>
      <p>{success ?? "Success Reset Password"}</p>
      {success ? null : <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor='new-password'>New Password</label>
          <input ref={passwordRef} type='password' id='new-password' />
        </div>
        <div className={classes.action}>
          <button onClick={handleResetPassword} >Change Password</button>
        </div>
      </form>
      }
    </Fragment>
  );
}

export default ProfileForm;
