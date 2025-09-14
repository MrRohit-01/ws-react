import { useEffect, useState } from "react";

export default function useSocket(): [WebSocket | null, string | undefined]{
 const [socket,setSocket] = useState<null |  WebSocket>(null);
 const [message,setMessage] = useState<string>();


 useEffect(()=>{
    const ws = new WebSocket("ws:localhost:8080");
    ws.onopen = ()=>{
        console.log("connected");
        ws.send("hi there i'm here");
        setSocket(ws);

    }
    ws.onmessage=(message)=>{
        setMessage(message.data);
    }
    return()=>{
        ws.close();
    }
 },[])
 return [socket,message];
}