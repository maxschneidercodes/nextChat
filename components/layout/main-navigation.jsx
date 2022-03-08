import Link from 'next/link';

import classes from './main-navigation.module.css';
import { Context } from '../../context/context';
import { useContext } from 'react';

function MainNavigation() {

  const { authUser, signOut } = useContext(Context)

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          <li>

            {authUser ? null : <Link href='/auth'>Login</Link>}
          </li>
          <li>
            {authUser ? <Link href='/profile'>Profile</Link> : null}
          </li>
          <li>
            {authUser ? <button onClick={signOut}>Logout</button> : null}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
