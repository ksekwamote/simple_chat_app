import React from 'react'
import {Avatar , Image} from 'antd'

export default function ChatBoxReciever({avatar , user, message}) {
  return (
    <div  style={{display:'flex', justifyContent:'flex-start' , flexDirection:'row'}} >
            <Avatar
            size={50}
            src={<Image
                src={avatar}
                style={{
                    objectFit:'cover',
                    width:45,
                    height:45,
                    borderRadius: "100%"
                }}
                preview={false}
                />}
            />
            <p style={{padding:10 , backgroundColor:'#dcf8c6', borderRadius: 10 , maxWidth: "60%" }} >
                <strong style={{fontSize:13}} >
                       {user} 
                </strong> <br></br>
                {message}
            </p>

    </div>
  )
}

export function ChatBoxSender({avatar , user, message}) {
    return (
      <div  style={{display:'flex', paddingRight:10  ,justifyContent:'flex-end' , flexDirection:'row'}} >
              <Avatar
              size={50}
              src={<Image
                  src={avatar}
                  style={{
                      objectFit:'cover',
                      width:45,
                      height:45,
                      borderRadius: "100%"
                  }}
                  preview={false}
                  />}
              />
              <p style={{padding:10 , backgroundColor:'#fff', borderRadius: 10 , maxWidth: "60%" }} >
                  <strong style={{fontSize:13}} >
                         {user} 
                  </strong> <br></br>
                  {message}
              </p>
  
      </div>
    )
  }