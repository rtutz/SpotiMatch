import { useState, useEffect } from "react";
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    query, 
    onSnapshot} from "firebase/firestore";
import Cookies from "universal-cookie";

function encodeStrings(str1, str2) {
    const delimiter = '|';
    const sortedStrings = [str1, str2].sort();
    return sortedStrings.join(delimiter);
  }
  
  function decodeString(encodedStr) {
    const delimiter = '|';
    const sortedStrings = encodedStr.split(delimiter).sort();
    return sortedStrings;
  }

const cookies = new Cookies();
// for props, we have to get chatId and UID of person to send to to.
// Sender: bFPNFGYEOKPzL6ypqQXNE7iISIq1
// Receiver: pzo5WEtdyuUqb4sByjWh0NN0vlQ2

// eslint-disable-next-line react/prop-types
function Chat({receiverUID}) {
    // Maybe add a state named render to trigger rerender when message is sent??
    const [messages, setMessages] = useState([]);

    console.log('Chat rendered');
    const user = cookies.get('auth-token');

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
                messagesList.push({ ...doc.data(), id: doc.id });
            });
            console.log(messagesList);
            setMessages(messagesList);
          });
    
    }, [])


    // Handles the submit functionality.
    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        
        // Set necessary information to send to firebase.
        const content = e.target.currentMessage.value;

        const message = {
            content,
            senderUID: user.uid,
            receiverUID: receiverUID,
        }
        
        // const db = getFirestore();

        // Successfully creates a message to database using proper data structure.
        // const chatRoomRef =  doc(collection(db, 'chatRooms'), roomId);
        // const messagesCollectionRef = collection(chatRoomRef, 'messages');

        await setDoc(doc(messagesCollectionRef), message);
        e.target.reset();
    }


    return (
        <>
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