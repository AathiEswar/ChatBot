import React from 'react'
import History from './History'
import Chat from './Chat'

function ChatMain() {
  return (
    <div className='flex w-screen h-screen flex-row '>
      <History/>
      <Chat/>
    </div>
  )
}

export default ChatMain
