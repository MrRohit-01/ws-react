import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useSocket from './hooks/useSocket'

function App() {
interface Message {
  id: string;
  data: string;
}
const [messageArray, setMessageArray] = useState<Message[]>([]);
const [socket, message,id] = useSocket();
const [sendSocket, setSendMessage] = useState<Message>();
const [text, setText] = useState("");



useEffect(()=>{
  if (message) {
    setMessageArray((prev) => [...prev, message]);
  }

},[message])

if(!socket){
  return (<>connecting to server...</>)
}

return (
  <>
    {messageArray.map((msg, index) => (
      <div key={index}>USER - [{msg.id}] ={'>'}{msg.data}</div>
    ))}
    <div>
      <input type="text" value={text} onChange={(e) =>{ setText(e.target.value); setSendMessage({ id, data: e.target.value })}} onKeyDown={(e)=>{
        if(e.key == "Enter" && sendSocket){
          setMessageArray((e)=>[...e, sendSocket]);
        socket.send(`USER - [${id}] =>${sendSocket.data} `);
        setText("")

        
        }

      }}/>
      <button onClick={()=>{
        if(sendSocket){
        setMessageArray((e)=>[...e, sendSocket]);
        socket.send(`USER - [${id}] =>${sendSocket.data} `);
        setText("")
        }
      }}>Send</button>
    </div>
  </>
  )
}


export default App
