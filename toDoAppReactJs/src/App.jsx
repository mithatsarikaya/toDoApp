import React from 'react'
import ToDo from './components/ToDo'

const createRandomId = () => {
  var randomWord = "";
  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    randomWord += str.charAt(char);
  }

  return randomWord;
};

const generateBlankDataToDo = () => {
  let randomId = createRandomId();
  let data = {
    id: randomId,
    text: "",
    done: false,
  };

  return data;
};

const getIdToDelete=(id)=>console.log("what");

function App() {
  const addNewToDo=()=>{
    setToDoLists(prevToDoLists=> [...prevToDoLists, generateBlankDataToDo()])
  }
  const[toDoLists, setToDoLists] = React.useState(JSON.parse(localStorage.getItem("data")) || [])
  console.log(toDoLists);


  return (
      <div>
    <header>
      <h1>TO DO OR NOT TO DO APP</h1>
      <button onClick={addNewToDo} className="header--button">Add</button>
    </header>
    <section>
      {toDoLists.map(toDoList=> <ToDo key={toDoList.id} getIdToDelete={getIdToDelete}/>)}
    </section>
    <script src="app.js"></script>
  </div>
  )
}

export default App
