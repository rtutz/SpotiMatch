import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, 
    collection, 
    query, 
    onSnapshot} from "firebase/firestore";
import { auth } from '../services/firebase/config'
import Cookies from "universal-cookie";
const cookies = new Cookies();
import Search from "./Search";

// import { Link } from "react-router-dom";

// import Search from "./Search";

// This component renders all the chats we've done before. This is necessary
// since it supplies the chatID (i.e. what chat is currently open) to Chat.jsx


function AllChats() {
    const [pplWithConvo, setPplWithConvo] = useState([]);

    const user = cookies.get('auth-token');

    // const user = {uid: '8738wVe5QwaYOCNWDbj96J2xPxs1'}

    useEffect(() => {
        const db = getFirestore();
        const chatRoomRef = collection(db, 'chatRooms');

        const queryChatRooms = query(chatRoomRef);

        // iterate over all chatRoomID documents.
        onSnapshot(queryChatRooms, (querySnapshot) => {
            let pplList = [];
            querySnapshot.forEach((doc) => {
                const docId = doc.id;
                const participants = doc.data().participants;

                // Access messages within this doc
                if (participants.includes(user.uid)) {
                    const otherUser = participants.filter(p => p!== user.uid)[0];
                    pplList.push({docId, receiverUID: otherUser });
                }
            });
            setPplWithConvo(pplList);
        });

    }, [])
    return (
    //     <div>
    //         <h1>All Chats</h1>
    //         <Search />
    //         <h3>Past converstations</h3>
    //             <ul>   
    //             {pplWithConvo.map((chat) => (
    //             <li key={chat.receiverUID}>
    //                 <Link to={`/dashboard/all/chat/${chat.receiverUID}`}>
    //                 {chat.receiverUID}
    //                 </Link>
    //             </li>
    //             ))}
    //             </ul>
    //   <Outlet />
    //     </div>

    <div className="flex w-full">
        <div className="h-screen border-r-2 border-gray-200-spotify w-40 sticky top-0">

        </div>
        <div className="flex flex-col w-full">
            <Search/>
            <Outlet/>
        </div>
    </div>
    )
}

export default AllChats;