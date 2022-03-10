import classes from './starting-page.module.css';
import ChatroomList from "../chatroom/chatroomList"

export default function StartingPageContent() {

  return (
    <section className={classes.starting}>
      <h2>Chat Rooms</h2>
      <ChatroomList />
    </section>
  );
}
