import classes from './user-profile.module.css';
import { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../context/context';
import { createRoom, getRoom, loadMessages, postMessage } from "../../utils/db/firebaseQuerry"

function UserProfile() {
  const { authUser } = useContext(Context)
  const router = useRouter();
  const [chatRoomID, setChatRoomID] = useState()
  const [loading, setLoading] = useState(true)
  const buttonRef = useRef()
  const textInputRef = useRef()
  const [messages, setMessages] = useState()

  useEffect(() => {
    setLoading(true)
    if (!authUser) {
      router.push('/auth')
    }
    loadRoom()
  }, [authUser])


  function loadRoom() {
    if (authUser) {
      (async function () {
        try {
          if (!chatRoomID) {
            await createRoom(authUser.uid)
          }
          let chatRoomId = await getRoom(authUser.uid)
          setChatRoomID(chatRoomId)
          setMessages(await loadChat(chatRoomId))
          setLoading(false)
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }


  if (!authUser || loading) {
    return <Fragment>
      <p style={{ textAlign: "center", }}>Loading...</p>
    </Fragment>
  }

  function loadChat(chatRoomId) {
    return loadMessages(chatRoomId)
  }

  let messagesHTML = messages.map(msg => {
    return <p>{msg.message}</p>
  })

  async function sendMessage(e) {
    e.preventDefault()
    await postMessage(chatRoomID, { message: textInputRef.current.value })
    loadRoom()
  }

  return (
    <div style={{ textAlign: "center", }}>
      <section className={classes.profile}>
        <h2>Hello {authUser.email}</h2>
        <h3>chatRoom ID: {chatRoomID}</h3>
        {messagesHTML}
        <form onSubmit={sendMessage}>
          <input ref={textInputRef} type="text"></input>
          <button>send</button>
        </form>
      </section>
    </div >
  );
}

export default UserProfile;
