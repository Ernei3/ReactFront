import React, {useContext} from 'react';
import {UserContext} from '../providers/UserProvider';
import SocialLoginButton from "./OathButton";


export default function LogNav(props) {
    const {user, setUser} = useContext(UserContext);



    function handleLogOut(){
        setUser(undefined);
    }

    if(user === undefined){
            return(
        <div>
            <SocialLoginButton provider={"google"} title={"Login with Google"}/>
            <SocialLoginButton provider={"facebook"} title={"Login with Facebook"}/>
        </div>
    )
    }else{
        return(
            <button
                type="button"
                className="logIn"
                onClick={handleLogOut}
            >
                Log Out
            </button>
        )
    }

}