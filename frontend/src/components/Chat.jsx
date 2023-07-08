import { useState, useEffect } from "react";
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    query, 
    onSnapshot,
    where,
    getDocs,
   getDoc} from "firebase/firestore";
import Cookies from "universal-cookie";
import { useParams } from 'react-router-dom';
import {auth} from '../services/firebase/config'

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


function Chat() {
  // Maybe add a state named render to trigger rerender when message is sent??
  const [messages, setMessages] = useState([]);
  const [receiverData, setReceiverData] = useState([]);

  const user = JSON.parse(localStorage.getItem('curr-user'));
  // console.log('user id in ayth', auth.currentUser.uid);

  const db = getFirestore();

  const {receiverUID} = useParams();

  useEffect(()=> {
    if (!receiverUID) return;
    const fetchUserInfo = async () => {
      try {
        const colRef = collection(db, 'users');
        const u = query(colRef, where('uid', "==", receiverUID));
        const queryUsers = await getDocs(u);
        queryUsers.forEach(doc => {
          setReceiverData(doc.data())
        })

      } catch (e) {
        console.error(e);
      }
    };
    fetchUserInfo();

  }, [receiverUID, db])

  
  const roomId = encodeStrings(user.uid, receiverUID);
  // const chatRoomRef =  doc(collection(db, 'chatRooms'), roomId);
  // setDoc(chatRoomRef, {participants: [user.uid, receiverUID]});
  // const messagesCollectionRef = collection(chatRoomRef, 'messages');

  // Renders the messages.
  useEffect(() => {
    
    const fetchData = async () => {
      // const querySnapshot = await collection(db, 'chatRooms').where('field',
      // '==', roomId).get();
      // const q = query(collection(db, 'chatRooms'), where('field', '==', roomId));
      // const querySnapshot = await getDocs(q);
      // if (querySnapshot.empty) return;
      // console.log('room exists');
      const docRef = doc(db, 'chatRooms', roomId);
      const docSnap = await getDoc(docRef);
      if (!(docSnap.exists())) {
        // console.log('roomId does not exist. No chat before'); 
        setMessages([]); 
        return;}
      // console.log('roomId exists. chatted before');
      const chatRoomRef =  doc(collection(db, 'chatRooms'), roomId);
      const messagesCollectionRef = collection(chatRoomRef, 'messages');
      const queryMessages = query(messagesCollectionRef);
      onSnapshot(queryMessages, (snapshot) => {
          let messagesList = [];
          snapshot.forEach((doc) => {
            
              messagesList.push({ ...doc.data(), id:doc.id });
          });
          setMessages(messagesList);
        });
    };

    fetchData()
  
  }, [db, roomId, receiverUID])


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

      const chatRoomRef =  doc(collection(db, 'chatRooms'), roomId);
      setDoc(chatRoomRef, {participants: [user.uid, receiverUID]});
      const messagesCollectionRef = collection(chatRoomRef, 'messages');
      await setDoc(doc(messagesCollectionRef), message);
      e.target.reset();
  }

  console.log('messages:', messages);
  console.log('receiverData', receiverData);

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