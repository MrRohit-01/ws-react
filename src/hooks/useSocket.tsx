import { useEffect, useState } from "react";

export default function useSocket(): [WebSocket | null, {id:string,data:string} | undefined,string]{
 const [socket,setSocket] = useState<null |  WebSocket>(null);
 const [message,setMessage] = useState<{id:string,data:string}>({
    id:'',
    data:''
 });
 const [id,setId] = useState<string>('');

 useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = ()=>{
        console.log("connected");
        ws.send("hi there i'm here");
        setSocket(ws);
        if(id ===''){
            setId(getUniqueID());
        }


    }
    ws.onmessage=(message)=>{
        setMessage({id: id, data: message.data});
    }
    return()=>{
        ws.close();
    }
 },[])
 return [socket,message,id];
}




const getUniqueID = ()=> {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4;
};