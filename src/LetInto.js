import React, { useContext } from 'react';
import {useParams} from 'react-router-dom'
import {UserContext} from "./providers/UserProvider";


export default function LetInto(props){
    const {user, setUser} = useContext(UserContext);
    const { point } = useParams();

    console.log(user, setUser);

    const handleSubmit = event => {


        event.preventDefault();
        let userId = event.target.userId.value;
        console.log(userId);


        if(point === "wishlist"){
            props.history.push('/wishlist/'+userId);
        }else if(point === "basket"){
            props.history.push('/basket/'+userId);
        }else if(point === "orders") {
            props.history.push('/point/'+userId);
        }
    }


    return (
        <div className="letInto">
            <form onSubmit={handleSubmit}>

                <label htmlFor="userId">User Id:</label>
                <input id="userId" name="userId" type="text" />

                <button>Go</button>
            </form>
        </div>
    )
}
