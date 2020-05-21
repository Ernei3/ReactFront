import React, {useContext} from 'react';
import {UserContext} from '../providers/UserProvider';
import {authenticate} from "./OauthService";

let existingWindow = null;

export default function OathButton({provider, title}) {
    const {setUser} = useContext(UserContext);

    function handleAuthentication() {
        window.socialProviderCallback = async function (socialProvider, queryParams) {
            let user = await authenticate(socialProvider, queryParams);
            setUser(user);
        };

        if (existingWindow) {
            existingWindow.close();
        }

        const w = 700;
        const h = 700;
        const dualScreenLeft =
            window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop =
            window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth
            ? window.innerWidth
            : document.documentElement.clientWidth
                ? document.documentElement.clientWidth
                : window.screen.width;
        const height = window.innerHeight
            ? window.innerHeight
            : document.documentElement.clientHeight
                ? document.documentElement.clientHeight
                : window.screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft;
        const top = (height - h) / 2 / systemZoom + dualScreenTop;
        existingWindow = window.open(
            `http://localhost:9000/authenticate/${provider}`,
            'Authentication',
            'scrollbars=yes, width=' +
            w / systemZoom +
            ', height=' +
            h / systemZoom +
            ', top=' +
            top +
            ', left=' +
            left
        );
    }

    return (
        <button
            type="button"
            className="logIn"
            onClick={handleAuthentication}
        >
            {title}
        </button>
    );
}