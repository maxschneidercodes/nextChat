import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../context/context';

function UserProfile() {
  const { authUser } = useContext(Context)
  const router = useRouter();


  useEffect(() => {
    if (!authUser) {
      router.push('/auth')
    }
  }, [authUser])

  if (!authUser) {
    return <Fragment>
      <p>Loading...</p>
    </Fragment>
  }

  return (
    <section className={classes.profile}>
      <h2>Hello {authUser.email}</h2>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
