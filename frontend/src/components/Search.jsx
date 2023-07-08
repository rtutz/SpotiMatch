import { useState, useEffect } from "react";
import DisplayPeople from "./DisplayPeople";
import { getFirestore, collection, query, onSnapshot} from "firebase/firestore";
import {setUsers} from '../features/userSlice';
import {useDispatch} from 'react-redux';

export default function Search() {
    const [isActive, setIsActive] = useState(false);
    const [people, setPeople] = useState([]);
    const [queryName, setQueryName] = useState("");
    const user = JSON.parse(localStorage.getItem('curr-user'));

    const dispatch = useDispatch();

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
            dispatch(setUsers(tempPeople));
        })
    }, []);

    const handleFocus = () => {
        setIsActive(true);
      };
    
      const handleBlur = () => {
        setTimeout(() => {
            setIsActive(false);
        }, 500);
      };

      const notUser = people.filter(person => person.uid !== user.uid);
      const curr = notUser.filter(person => person.username.includes(queryName));

    // Do a slice when passing people to DisplayPeople
    return (
        // <div>
        //     <h2>Search</h2>
        //     <form>
        //         <input type="text" onChange={(e)=>{setQueryName(e.target.value)}} 
        //             onFocus={handleFocus}
        //             onBlur={handleBlur}/>
        //             <button type="submit">Search</button>
        //     </form>
        //     {isActive && <DisplayPeople people={curr}/>}
        // </div>
        <div>
            <form>
                <input className="w-80 " type="text" 
                    onChange={(e)=>{setQueryName(e.target.value)}} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Who do you want to talk to?"/>
            </form>
        </div>
       
        
    )
}