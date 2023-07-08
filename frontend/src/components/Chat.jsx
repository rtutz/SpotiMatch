import { useState, useEffect } from "react";
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    query, 
    onSnapshot} from "firebase/firestore";
import Cookies from "universal-cookie";
import { useParams } from 'react-router-dom';

function encodeStrings(str1, str2) {
    const delimiter = '|';
    const sortedStrings = [str1, str2].sort();
    return sortedStrings.join(delimiter);
  }
  
// function decodeString(encodedStr) {
//   const delimiter = '|';
//   const sortedStrings = encodedStr.split(delimiter).sort();
//   return sortedStrings;
// }

const cookies = new Cookies();

function Chat() {
  // Maybe add a state named render to trigger rerender when message is sent??
  const [messages, setMessages] = useState([]);

  const user = cookies.get('auth-token');

  const {receiverUID} = useParams();

  const db = getFirestore();
  const roomId = encodeStrings(user.uid, receiverUID);
  const chatRoomRef =  doc(collection(db, 'chatRooms'), roomId);
  setDoc(chatRoomRef, {participants: [user.uid, receiverUID]});
  const messagesCollectionRef = collection(chatRoomRef, 'messages');


  // Renders the messages.
  useEffect(() => {
      const queryMessages = query(messagesCollectionRef);
      onSnapshot(queryMessages, (snapshot) => {
          let messagesList = [];
          snapshot.forEach((doc) => {
              messagesList.push({ ...doc.data() });
          });
          setMessages(messagesList);
        });
  
  }, [])


  // Handles the submit functionality.
  const handleMessageSubmit = async (e) => {
      e.preventDefault();
      
      // Set necessary information to send to firebase.
      const content = e.target.currentMessage.value;
      if (content === '') return;
      const message = {
          content,
          senderUID: user.uid,
          receiverUID: receiverUID,
      }

      await setDoc(doc(messagesCollectionRef), message);
      e.target.reset();
  }


  return (
      <>
      <h1>Individual Chat</h1>
      {messages.map((message) => (
        <div key={message.id} className="message">
          <span className="user">{}:</span> {message.content}
        </div>
      ))}

      <form onSubmit={handleMessageSubmit}>
          <input type="text" placeholder="Type your message here..." name='currentMessage'/>
          <button type="submit">Send</button>
      </form>
      </>
  )
}

export default Chat;