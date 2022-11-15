import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserLogin from './UserLogin';
import {
    doc,
    setDoc,
    collection,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
  
  } from 'firebase/firestore';
  import db from "./firebaseConfig/firebaseConfig.js"


export default function ChatContainer() {
  
    let socketio  = socketIOClient("http://localhost:5001")
    const [chats , setChats] = useState([])
    const [user, setUser] = useState(localStorage.getItem("user"))
    const avatar = localStorage.getItem('avatar')
    const chatsRef = collection(db , "Messages")
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }    

    useEffect(() => {
      scrollToBottom()
    }, [chats])

    useEffect(()=> {
        socketio.on('chat', senderChats => {
            setChats(senderChats)
        })
    })


    useEffect(()=>{

        const q = query(chatsRef , orderBy('createdAt' , 'asc'))
      
        const unsub = onSnapshot(q, (querySnapshot) =>{
          const fireChats =[]
          querySnapshot.forEach(doc => {
            fireChats.push(doc.data())
          });
         setChats([...fireChats])
        })
        return ()=> {
          unsub()
        }
      
      },[])

     function addToFirrebase(chat){
        const newChat = {
            avatar,
            createdAt: serverTimestamp(),
            user,
            message: chat.message
        }

        const chatRef = doc(chatsRef)
        setDoc(chatRef , newChat)
        .then(()=> console.log('Chat added succesfully'))
        .catch(console.log)
     } 
   

    function sendChatToSocket(chat){
        socketio.emit("chat" , chat)
    }

    function addMessage(chat){
        const newChat = {...chat , user:localStorage.getItem("user") , avatar}
        addToFirrebase(chat)
        setChats([...chats , newChat])
        sendChatToSocket([...chats , newChat])
    }

    function logout(){
        localStorage.removeItem("user")
        localStorage.removeItem("avatar")
        setUser("")   
    }

    function ChatsList(){
        return( <div style={{ height:'75vh' , overflow:'scroll' , overflowX:'hidden' }}>
              {
                 chats.map((chat, index) => {
                  if(chat.user === user) return <ChatBoxSender  key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
                  return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
              })
              }
               <div ref={messagesEndRef} />
        </div>)
       
    }

  return (
    <div>
        {
        user ?
         <div>
        
         <div style={{display:'flex', flexDirection:"row", justifyContent: 'space-between'}} >
          <h4>Username: {user}</h4>
          <strong>Remember to Subscribe to  <a href='https://www.youtube.com/channel/UCmoQtgmJ2SHEAPCAR1Q8TBA'> My Channel</a></strong>
          <p onClick={()=> logout()} style={{color:"blue", cursor:'pointer'}} >Log Out</p>
           </div>
            <ChatsList
             />
            
            <InputText addMessage={addMessage} />
        </div>
        : <UserLogin setUser={setUser} />
        }

    <div style={{margin:10 , display:'flex', justifyContent:'center'}} >
    <small style={{backgroundColor:'lightblue' , padding:5 , borderRadius:5}} >Interested in some 1 on 1 Coding Tutorials and Mentorship. Lets chat on Discord: <strong> kutlo_sek#5370 </strong></small>
        
    </div>
     
    </div>
  )
}
