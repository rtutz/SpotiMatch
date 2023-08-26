import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, 
    collection, 
    query, 
    onSnapshot,
    getDocs} from "firebase/firestore";

import Search from "./Search";
import Loading from '../assets/Loading'

function AllChats() {
    const [allUsers, setAllUsers] = useState(null);
    const [pplWithConvo, setPplWithConvo] = useState(null);

    const user = JSON.parse(localStorage.getItem('curr-user'));
    const Navigate = useNavigate();

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
                        

                        // Access messages within this doc
                        if (participants.includes(user.uid)) {
                            const otherUser = participants.filter(p => p!== user.uid)[0];
                            pplList.push({docId, receiverUID: otherUser });
                        }
                    });
                    setPplWithConvo(pplList);
                });

                const colRef = collection(db, 'users');
                const userQuery = query(colRef);
                const queryUsers = await getDocs(userQuery);

                const tempAllUsers = [];
                queryUsers.forEach(doc => {
                tempAllUsers.push(doc.data());
                });

                setAllUsers(tempAllUsers);
            } catch (e) {
                return (
                    
                    <div>
                        <h1>An error has been encountered. Please login again.</h1>
                        <button className="btn-green" onClick={() => Navigate('/')}>
                            Go Home
                        </button>
                    </div>
                )
            }
        }
        fetchUsers();

    }, [Navigate, user.uid])
 

    if (pplWithConvo && allUsers) {
    return (

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