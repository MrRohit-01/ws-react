import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useSocket from './hooks/useSocket'

function App() {
const [messageArray, setMessageArray] = useState<string[]>([]);
const [socket, message] = useSocket();
const [sendSocket, setSendMessage] = useState<string>('');


useEffect(()=>{
  if (message && typeof message === 'string') {
    setMessageArray((prev) => [...prev, message]);
  }

},[message])

if(!socket){
  return (<>connecting to server...</>)
}

return (
  <>
    {messageArray.map((msg, index) => (
      <div key={index}>{msg}</div>
    ))}
    <div>
      <input type="text" onChange={(e) => setSendMessage(e.target.value)} onKeyDown={(e)=>{
        if(e.key == "Enter"){
          setMessageArray((e)=>[...e, sendSocket]);
        socket.send(sendSocket);
        }
      }}/>
      <button onClick={()=>{
        setMessageArray((e)=>[...e, sendSocket]);
        socket.send(sendSocket);
      }}>Send</button>
    </div>
  </>
  )
}


export default App
