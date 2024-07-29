import React from 'react'
import History from './History'
import Chat from './Chat'
import ChatHeader from './ChatHeader'

function ChatMain() {
  return (
    <div className='flex w-screen h-screen flex-col '>
      <ChatHeader/>
      <div className='flex w-screen h-full flex-row'>
        <History/>
        <Chat/>
      </div>
    </div>
  )
}

export default ChatMain
