import React, {useContext} from 'react';
import {UserContext} from '../providers/UserProvider';
import SocialLoginButton from "./OathButton";
import {signOut} from "./OauthService";


export default function LogNav() {
    const {user, setUser} = useContext(UserContext);

    function handleLogOut(){
        signOut(user);
        setUser(undefined);
    }

    if(user === undefined || user === null){
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