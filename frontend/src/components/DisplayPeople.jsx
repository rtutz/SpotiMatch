import { Link } from "react-router-dom";

export default function DisplayPeople({people}) {
    console.log('IN DISPLAY PEOPLE:', people);
    return (
        <div>
            <h1>People</h1>
            {people.map(person => {return (
                <h3 key={person.id}>
                <Link to={`/dashboard/all/chat/${person.uid}`}>
                    {person.email}
                </Link>
                </h3>
            )})}
        </div>
    )
}