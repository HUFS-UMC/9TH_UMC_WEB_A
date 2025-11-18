import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
    const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if(accessToken){
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            window.location.replace('/my')
        }

        //urlParams는 4개의 query parameter인 id, name, access, refresh를 의미
        //window.loation.search는 urlParams 뒤의 query parameter를 의미
    }, [setAccessToken, setRefreshToken]);
    return (
        <div>
            구글 로그인 리다이렉 화면
        </div>
    )
};

export default GoogleLoginRedirectPage;
