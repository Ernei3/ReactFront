import React, {useContext} from "react";
import {UserContext} from '../providers/UserProvider';
import {Redirect} from "react-router-dom";

export default function LogIn() {


    const {user, setUser} = useContext(UserContext);

    if(user === undefined || user === null){
        return (
            <div>
                <p>Please log into a user account!</p>
            </div>
        )
    }else{
        return(
            <Redirect to='/'/>
        )
    }
}