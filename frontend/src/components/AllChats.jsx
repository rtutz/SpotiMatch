import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, 
    collection, 
    query, 
    onSnapshot,
    getDocs} from "firebase/firestore";
import { auth } from '../services/firebase/config'
import Cookies from "universal-cookie";
const cookies = new Cookies();
import Search from "./Search";
import { useSelector } from "react-redux";
import Loading from '../assets/Loading'
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

// import Search from "./Search";

// This component renders all the chats we've done before. This is necessary
// since it supplies the chatID (i.e. what chat is currently open) to Chat.jsx


function AllChats() {
    const [allUsers, setAllUsers] = useState(null);
    const [pplWithConvo, setPplWithConvo] = useState(null);

    const user = JSON.parse(localStorage.getItem('curr-user'));

    // const user = {uid: '8738wVe5QwaYOCNWDbj96J2xPxs1'}

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const db = getFirestore();
                const chatRoomRef = collection(db, 'chatRooms');

                const queryChatRooms = query(chatRoomRef);

                // iterate over all chatRoomID documents.
                onSnapshot(queryChatRooms, (querySnapshot) => {
                    let pplList = [];
                    querySnapshot.forEach((doc) => {
                        const docId = doc.id;
                        const participants = doc.data().participants;
                        console.log(participants);

                        // Access messages within this doc
                        if (participants.includes(user.uid)) {
                            const otherUser = participants.filter(p => p!== user.uid)[0];
                            pplList.push({docId, receiverUID: otherUser });
                        }
                    });
                    setPplWithConvo(pplList);
                });

                const colRef = collection(db, 'users');
                const u = query(colRef);
                const queryUsers = await getDocs(u);

                const tempAllUsers = [];
                queryUsers.forEach(doc => {
                tempAllUsers.push(doc.data());
                });

                setAllUsers(tempAllUsers);
            } catch (e) {
                console.log('error in allChats.jsx');
                console.error(e);
            }
        }
        fetchUsers();

    }, [user.uid])
    console.log("pplWithConvo", pplWithConvo);
    console.log('allUsers', allUsers);

    if (pplWithConvo && allUsers) {
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

    <div className="flex w-full ml-2">
        <div className="border-r-gray-950 border-r-2 min-w-max">
            {pplWithConvo.map(person => {
                const currentId = person.receiverUID;
                let personName;
                let personPic;

                allUsers.forEach(user => {
                    if (currentId === user.uid) {
                        personName = user.spotify.currUserProfile.display_name;
                        personPic = user.spotify.currUserProfile.images[0].url;
                    }
                })

                return (
                    <Link key={person.docId} to={`/dashboard/all/chat/${person.receiverUID}`}>
                        <div key={person.docId} className="flex m-4 items-center">
                            <img className="h-10 w-10 rounded-full" src={personPic} alt="" />
                            <h1 className="ml-4">{personName}</h1>
                        </div>
                    </Link>
                )
            })}
        </div>
        <div className="flex flex-col w-full">
            <Search/>
            <Outlet/>
        </div>
    </div>
    )
    } else {
        return (
            <Loading />
        )
    }
}

export default AllChats;