import { useState, useEffect, useRef } from "react";
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    query, 
    onSnapshot,
    getDocs,
   getDoc,
  orderBy} from "firebase/firestore";
import { useParams } from 'react-router-dom';
import Loading from '../assets/Loading';
import {calculateCompatability} from '../services/API/api'
import useAuth from "../hooks/useAuth";
import Popup from "./Popup";

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

function getIdsAsString(data) {
  const ids = data.map(obj => obj.id);
  return ids.join('%2C');
}

function formatRelativeTime(timestamp) {
  const date = timestamp.toDate(); // Convert Firebase timestamp to JavaScript Date object
  const now = new Date(); // Current date/time

  // Calculate the time difference in milliseconds
  const diff = now.getTime() - date.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  // Determine the appropriate relative time string
  if (diff < minute) {
    return "Just now";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // Fallback to full date/time if more than a week ago
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
}



function Chat({authToken}) {
  console.log('auth token in chat', authToken);
  const accessToken = useAuth(authToken);
  console.log('access token in chat', accessToken);
  // Change state.users.users to state.users
  // const allUsers = useSelector(state => state.users.users);
  const [allUsers, setAllUsers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [messageAdded, setMessageAdded] = useState(false);
  const messagesEndRef = useRef(null);
  const [compatabilityScore, setCompatabilityScore] = useState(null);
  const [showCompatability, setShowCompatability] = useState(false);

  const user = JSON.parse(localStorage.getItem('curr-user'));
  // console.log('user id in ayth', auth.currentUser.uid);

  const db = getFirestore();

  const {receiverUID} = useParams();

  console.log('allUsers', allUsers);
  useEffect(()=> {
    if (!receiverUID && !allUsers) return;
    const fetchUserInfo = async () => {
      try {
        // allUsers.forEach(userState => {
        //   if (userState.uid === receiverUID) {
        //     console.log(userState);
        //     setReceiverData(userState);}
        // })
        // EITHER PULL DATA FROM DATABASE ORRR JUST USE STATE TO GET DATA
        
        const colRef = collection(db, 'users');
        const u = query(colRef);
        const queryUsers = await getDocs(u);

        const tempAllUsers = [];
        queryUsers.forEach(doc => {
          tempAllUsers.push(doc.data());
          if (doc.data().uid === receiverUID) setReceiverData(doc.data());
        });

        setAllUsers(tempAllUsers);

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
      console.log('database', db);
      const docRef = doc(db, 'chatRooms', roomId);
      const docSnap = await getDoc(docRef);
      if (!(docSnap.exists())) {
        // console.log('roomId does not exist. No chat before'); 
        setMessages([]); 
        return;}
      // console.log('roomId exists. chatted before');
      const chatRoomRef =  doc(collection(db, 'chatRooms'), roomId);
      const messagesCollectionRef = collection(chatRoomRef, 'messages');
      const queryMessages = query(messagesCollectionRef, orderBy("date"));
      onSnapshot(queryMessages, (snapshot) => {
          let messagesList = [];
          snapshot.forEach((doc) => {
            
              messagesList.push({ ...doc.data(), id:doc.id });
          });
          setMessages(messagesList);
        });
    };

    fetchData()
  
  }, [db, roomId, receiverUID, messageAdded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  // 


  // Handles the submit functionality.
  const handleMessageSubmit = async (e) => {
      setMessageAdded(!messageAdded);
      e.preventDefault();
      const now = new Date();
      
      // Set necessary information to send to firebase.
      const content = e.target.currentMessage.value;
      if (content === '') return;
      const message = {
          content,
          senderUID: user.uid,
          receiverUID: receiverUID,
          date: now 
      }

      const chatRoomRef =  doc(collection(db, 'chatRooms'), roomId);
      setDoc(chatRoomRef, {participants: [user.uid, receiverUID]});
      const messagesCollectionRef = collection(chatRoomRef, 'messages');
      await setDoc(doc(messagesCollectionRef), message);
      e.target.reset();
  }



  // const calculateCompatabilityFn = async () => {
  //   const currentUser = allUsers.filter(userList => userList.uid === user.uid)[0];
  //   console.log('currentUser', currentUser);
  //   await calculateCompatability(currentUser.spotify.topTracks, receiverData.spotify.topTracks)

    
  // }
  useEffect(() => {
    if (allUsers && receiverData && accessToken) {
      const currentUser = allUsers.filter(userList => userList.uid === user.uid)[0];
      // REMOVE [0] LATER!!!!!!!!!!!!!
      const userTracksAsId = getIdsAsString(currentUser.spotify.topTracks.items);
      console.log("userTracksAsId", userTracksAsId);
      const receiverTracksAsId = getIdsAsString(receiverData.spotify.topTracks.items, accessToken);

      calculateCompatability(userTracksAsId, receiverTracksAsId, accessToken).then(data => {
        setCompatabilityScore(data)})
      .catch(e => {
        console.log('error in pulling data from python at Chat.jsx')
        console.error(e)
      })
      
    }
  }, [allUsers, receiverData, user, accessToken]);

  showCompatability ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
  
  console.log('compatabilityScore', typeof(compatabilityScore));
  if (receiverData && messages && allUsers) {
  return (
    <>
    <div className="flex flex-col mb-10 h-full justify-between" id="entire chat">
        <div className="relative">

          {(showCompatability && compatabilityScore) && <Popup score={compatabilityScore} setShowCompatability={setShowCompatability} scrollToBottom={scrollToBottom} />}
        
          <div id="headerNameAndPic" className="flex items-center m-5" >
            <img className="w-10 h-10 rounded-full" src={receiverData.spotify.currUserProfile.images[0].url} alt="" />
            <h1 className="ml-4 font-black tracking-wide">{receiverData.spotify.currUserProfile.display_name}</h1>

            <button className="btn-green ml-3 top-0 left-0" onClick={() => {setShowCompatability(true)}}>
              Calculate compatability
            </button>
          </div>
  
  
          {/* FORR MESSAGESSSS */}
          {messages.map((message) => {
          const content = message.content;
          const senderUID = message.senderUID;
          let senderProfileName = null; // Initialize the variable
          let senderProfilePic;
  
          allUsers.forEach((item) => {
            if (item.uid === senderUID) {
              senderProfilePic = item.spotify.currUserProfile.images[0].url;
              senderProfileName = item.spotify.currUserProfile.display_name;
            }
          });
  
          return (
            <div key={message.id} className="flex items-center m-5">
              <img className="w-16 h-16 rounded-full" src={senderProfilePic} alt="" />
              
                <div className="ml-5 flex flex-col">
                  <div className="flex items-center">
                    <h1 className="font-bold text-spotify-green">{senderProfileName}</h1>
                    <p className="ml-4 text-xs text-gray-200-spotify">{formatRelativeTime(message.date)}</p>
                  </div>
                  <p className="font-normal">{content}</p>
                  
                </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}/>
        </div>
    <div className="sticky bottom-10 w-full z-10" id="input chat">
      <form onSubmit={handleMessageSubmit} className="w-11/12 mx-auto">
        <input type="text" className="placeholder-gray-600-spotify w-full bg-gray-500-spotify p-5 rounded-full" placeholder="Type your message here..." name="currentMessage" />
      </form>
    </div>
      </div>
  </>
  )
  } else {
    return (
      <Loading />
    )
  }
}

export default Chat;


      // <>
      // <h1>Individual Chat</h1>
      // {messages.map((message) => (
      //   <div key={message.id} className="message">
      //     <span className="user">{}:</span> {message.content}
      //   </div>
      // ))}

      // <form onSubmit={handleMessageSubmit}>
      //     <input type="text" placeholder="Type your message here..." name='currentMessage'/>
      //     <button type="submit">Send</button>
      // </form>
      // </>