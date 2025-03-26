import { useState } from 'react'
import './App.css'
import CharacterSheet from './components/CharacterSheet'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
  
      <CharacterSheet />
    </div>
    </>
  )
}

export default App
