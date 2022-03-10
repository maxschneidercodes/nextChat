import classes from './user-profile.module.css';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../context/context';
import { createRoom, getRoom } from "../../utils/db/firebaseQuerry"

function UserProfile() {
  const { authUser } = useContext(Context)
  const router = useRouter();
  const [chatRoom, setChatRoom] = useState()

  useEffect(() => {
    if (!authUser) {
      router.push('/auth')
    }
    if (authUser) {

      (async function () {
        try {
          let chatRoomId = await getRoom(authUser.uid)
          console.log(chatRoomId)
          setChatRoom(chatRoomId)
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [authUser])

  if (!authUser) {
    return <Fragment>
      <p>Loading...</p>
    </Fragment>
  }

  function createChatRoome(e) {
    e.preventDefault()
    chatRoomcreateRoom(authUser.uid)
  }

  return (
    <Fragment>
      <section className={classes.profile}>
        <h2>Hello {authUser.email}</h2>
        <form onSubmit={createChatRoome}>
          <button >create Chatroom</button>
        </form>
        <form>
          <input placeholder='id' type="text"></input>
          <button>join Chatroom</button>
        </form>
      </section>
      <button>join {chatRoom}</button>
    </Fragment>
  );
}

export default UserProfile;
