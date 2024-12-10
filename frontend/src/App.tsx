import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Chatbot } from './components/Chatbot'

function App() {
  return (
    <div className='flex flex-col min-h-full w-full max-w-3xl mx-auto px-4'>
      <header className='sticky top-0 shrink-0 z-20 bg-white'>
        <div className='flex flex-col h-full w-full gap-1 pt-4 pb-2'>
          <h1 className='font-urbanist text-[1.65rem] font-semibold'>DeviceCare FAQ AI Chatbot</h1>
        </div>
      </header>
      <Chatbot />
    </div>
  );
}

export default App