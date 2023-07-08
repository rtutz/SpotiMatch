import { useState, useEffect } from "react";
import DisplayPeople from "./DisplayPeople";
import { getFirestore, collection, query, onSnapshot} from "firebase/firestore";

export default function Search() {
    const [isActive, setIsActive] = useState(false);
    const [people, setPeople] = useState([]);
    const [queryName, setQueryName] = useState("");

    console.log(people);

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
        }, 100);
      };

      const curr = people.filter(person => person.username.includes(queryName));

    console.log('Current people:', curr);
    // Do a slice when passing people to DisplayPeople
    return (
        <div>
            <h2>Search</h2>
            <form>
                <input type="text" onChange={(e)=>{setQueryName(e.target.value)}} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}/>
                    <button type="submit">Search</button>
            </form>
            {isActive && <DisplayPeople people={curr}/>}
        </div>
        
    )
}