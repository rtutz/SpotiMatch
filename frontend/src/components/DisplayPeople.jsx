import { Link } from "react-router-dom";

export default function DisplayPeople({people}) {
    return (
        <div>
            <h1>People</h1>
            {people.map(person => {return (
                <h3 key={person.uid}>
                <Link to={`/dashboard/all/chat/${person.uid}`}>
                    {person.email}
                </Link>
                </h3>
            )})}
        </div>
    )
}