import classes from './user-profile.module.css';
import { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../context/context';
import { createRoom, getRoom, loadMessages, postMessage } from "../../utils/db/firebaseQuerry"

export default function UserProfile() {
  const { authUser } = useContext(Context)
  const router = useRouter();
  const [chatRoomID, setChatRoomID] = useState(null)
  const [loading, setLoading] = useState(true)
  const messageInputRef = useRef()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setLoading(true)
    if (!authUser) {
      router.push('/auth')
    }
    loadRoom()
  }, [authUser])

  async function handleRoomCreate(e) {
    e.preventDefault()
    await createRoom(authUser.uid)
    let chatRoomId = await getRoom(authUser.uid)
    setChatRoomID(chatRoomId)
    setMessages(await loadMessages(chatRoomId))
    setLoading(false)
  }

  function loadRoom() {
    if (authUser) {
      (async function () {
        try {
          let chatRoomId = await getRoom(authUser.uid)
          setChatRoomID(chatRoomId)
          setMessages(await loadMessages(chatRoomId))
          setLoading(false)
        } catch (e) {
          setLoading(false)
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

  let messagesHTML = messages.sort(function (a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
  }).map(msg => {
    return <div style={{ display: "flex", flexDirection: "column" }} key={Math.random()}>
      <p> <strong>{msg.user}</strong> says: {msg.message}</p>
    </div>
  })

  async function sendMessage(e) {
    if (authUser) {
      e.preventDefault()
      await postMessage(chatRoomID, {
        message: messageInputRef.current.value,
        user: authUser.email,
        timestamp: new Date().toISOString()
      })
      messageInputRef.current.value = ""
      loadRoom()
    }
  }

  return (
    <div style={{ textAlign: "center", }}>
      <section className={classes.profile}>
        {chatRoomID ? <div>
          <h2>Your ChatRoom</h2>
          <h3>chatRoomID: {chatRoomID}</h3>
          <div style={{ display: "flex", }}>
            <ul style={{ listStyleType: "none", height: "50vh", width: "80%", overflow: "hidden", overflowY: "scroll" }}>
              {messagesHTML}
            </ul>
          </div>
          <form onSubmit={sendMessage}>
            <input ref={messageInputRef} type="text"></input>
            <button>send</button>
          </form>
        </div>
          : <form>
            <button onClick={handleRoomCreate}>create Chatroom</button>
          </form>
        }
      </section>
    </div >
  );
}

