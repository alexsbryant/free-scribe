import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className='min-h-screen flex flex-col'>
        <header className='flex items-center justify-between gap-4 p-4'>
          <h1>Free<span className='text-blue-400'>Scribe</span></h1>
          <button className='flex items-center gap-2'>
            <p>New</p>
            <i className="fa-solid fa-plus"></i>
          </button>
        </header>
        <main className='flex-1 p-4 flex flex-col justify-center'>
          
        </main>
      </section>
      <h1 className="text-green-400">Hello World.</h1>
      <footer>

      </footer>
    </div>
  )
}

export default App;
