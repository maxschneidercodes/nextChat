import classes from './user-profile.module.css';
import { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../context/context';
import { createRoom, getRoom, loadMessages, postMessage } from "../../utils/db/firebaseQuerry"

function UserProfile() {
  const { authUser } = useContext(Context)
  const router = useRouter();
  const [chatRoomID, setChatRoomID] = useState(null)
  const [loading, setLoading] = useState(true)
  const textInputRef = useRef()
  const joinTextRef = useRef()
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

  async function handleJoinChatRoom(e) {
    e.preventDefault()
    setLoading(true)
    setChatRoomID(joinTextRef.current.value)
    setMessages(await loadMessages(joinTextRef.current.value))
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

  let messagesHTML = messages.map(msg => {
    return <div key={Math.random()}>
      <li>{msg.message}</li>
    </div>
  })

  async function sendMessage(e) {
    if (authUser) {
      e.preventDefault()
      await postMessage(chatRoomID, { message: textInputRef.current.value })
      loadRoom()
    }
  }

  return (
    <div style={{ textAlign: "center", }}>
      <section className={classes.profile}>
        <h2>Hello {authUser.email}</h2>
        {chatRoomID ? null : <form>
          <button onClick={handleRoomCreate}>create Chatroom</button>
        </form>}
        <form>
          <input ref={joinTextRef} type="text"></input>
          <button onClick={handleJoinChatRoom}>join Chatroom</button>

        </form>
        <br />
        <h2>Your ChatRoom</h2>
        <h3>chatRoomID: {chatRoomID}</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ul style={{ listStyleType: "none", height: "500px", width: "50%", overflow: "hidden", overflowY: "scroll" }}>
            {messagesHTML}
          </ul>
        </div>
        <form onSubmit={sendMessage}>
          <input ref={textInputRef} type="text"></input>
          <button>send</button>
        </form>
      </section>
    </div >
  );
}

export default UserProfile;
