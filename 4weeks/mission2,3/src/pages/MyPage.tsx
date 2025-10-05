import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";

//내정보를 조회하는 패이지
const Mypage = () => {
    useEffect(()=>{const getData =async()=> {
const response  = await getMyInfo();
console.log(response);
    };

getData();

},[]);
    return<div>Mypage</div>
};

export default Mypage;