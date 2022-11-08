import React, { useState } from 'react'
import { CommentOutlined } from '@ant-design/icons'
import _ from 'lodash'

const button = {
    width:'10%' ,
    height:50 ,
    fontWeight:'bold', 
    borderRadius:10 ,
    fontSize:18 ,
    backgroundColor:'#075e54',
    borderWidth:0,
    color:'#fff',
    margin:10
  }


export default function UserLogin({setUser}) {

    const [user , setAUser] = useState("")

    function handleSetUser(){
        if(!user) return
        localStorage.setItem("user" , user)
        setUser(user)
        localStorage.setItem("avatar" ,`https://picsum.photos/id/${_.random(1, 1000)}/200/300`)
    
    }

  return (
    <div>
          <h1 style={{margin:10, textAlign:'center'}}><CommentOutlined color={'green'} />  Super Chat </h1>
          
          <div style={{display:'flex' ,justifyContent:'center'}}>

          <input
                    style={{margin:10, height:30, width:'25%', borderRadius:10 , borderWidth:10 , fontSize:15 , paddingInline:5}}
                    value={user}
                    onChange={e=> setAUser(e.target.value)}
                    placeholder="Write a random name"
                    ></input>
        <button
                 onClick={()=> handleSetUser()}
                 style={button}
                >
                    Login
                </button>

          </div>
          
    </div>
  )
}
