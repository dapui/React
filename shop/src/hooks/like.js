import {useEffect, useState} from "react";
import axios from "axios";

export function useLike() {
    let [like, setLike] = useState(0);

    function addLike() {
        setLike(a => a + 1);
    }

    return [like, addLike];
}

export function useUsername(){
    let [username, setUsername] = useState('');
    useEffect(()=>{
        axios.get('/username.json').then((r)=>{
            setUsername(r.data)
        })
    },[])
    return username;
}