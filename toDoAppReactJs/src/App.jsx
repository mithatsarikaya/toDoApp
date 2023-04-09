import { useState } from 'react'
import ToDo from './components/ToDo'

function App() {


  return (
    <div className="App">
      <body>
    <header>
      <h1>TO DO OR NOT TO DO APP</h1>
      <button class="header--button">Add</button>
    </header>
    <section>
      <ToDo />
    </section>
    <script src="app.js"></script>
  </body>
    </div>
  )
}

export default App
