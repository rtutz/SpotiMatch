import { useState, useEffect } from "react";
import DisplayPeople from "./DisplayPeople";
import { getFirestore, collection, query, onSnapshot} from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
    const [isActive, setIsActive] = useState(false);
    const [people, setPeople] = useState([]);
    const [queryName, setQueryName] = useState("");
    const user = JSON.parse(localStorage.getItem('curr-user'));


    useEffect(() => {
        const db = getFirestore();
        const usersRef = collection(db, "users");
        const queryUsers = query(usersRef);
        onSnapshot(queryUsers, (querySnapshot) => {
            let tempPeople = [];
            querySnapshot.forEach((doc) => {
                tempPeople.push({...doc.data(), id: doc.id});
            });
            setPeople(tempPeople);

        })
    }, []);

    const handleFocus = () => {
        setIsActive(true);
      };
    
      const handleBlur = () => {
        setTimeout(() => {
            setIsActive(false);
        }, 300);
      };

      const notUser = people.filter(person => person.uid !== user.uid);
      const curr = notUser.filter(person => person.username.includes(queryName));

    // Do a slice when passing people to DisplayPeople
    return (
            <div className="absolute right-6 top-6 z-100">
           <form className="relative">
                <input
                    className="pl-5 w-80 px-6 py-3 rounded-full text-sm bg-gray-500-spotify placeholder-gray-600-spotify"
                    type="text"
                    value={queryName}
                    onChange={(e) => setQueryName(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="      Who do you want to talk to?"
                />
                {queryName ? null : (
                    <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute top-3 left-4"
                    style={{ color: "#6D7575" }}
                    />
                )}
            </form>
            {isActive && <DisplayPeople people={curr}/>}
        </div>
       
        
    )
}