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


function App() {
  const addNewToDo=()=>{
    setToDoLists(prevToDoLists=> [...prevToDoLists, generateBlankDataToDo()])
  }
  //lazt initialization added
  const[toDoLists, setToDoLists] = React.useState(()=>JSON.parse(localStorage.getItem("data")) || [])
  //delete
  const getIdToDelete=(id)=>{
    setToDoLists(prevList=>prevList.filter(p=>p.id!==id))
  }

  //update done / undone
  //since it is controlling with two buttons and it is a boolean value ; then just reverse the current value, react will care the rest. i love react so far
  const getIdToUpdateDoneOrUndone=(id)=>{
    setToDoLists(prevToDoLists=>
      prevToDoLists.map(prevToDoList=>prevToDoList.id===id ? 
      {...prevToDoList, done:!prevToDoList.done} 
      : prevToDoList))
    }
    
    
    //update text
    const getIdToUpdateText=(e,id)=>{
      setToDoLists(prevToDoLists=>
        prevToDoLists.map(prevToDoList=>prevToDoList.id===id ? 
        {...prevToDoList, text:e.target.value} 
        : prevToDoList))
  }

  React.useEffect(()=>{
    localStorage.setItem("data", JSON.stringify(toDoLists))
    if(toDoLists.length===0){localStorage.clear()}
  }, [toDoLists])


  return (
      <div>
    <header>
      <h1>TO DO OR NOT TO DO APP</h1>
      <button onClick={addNewToDo} className="header--button">Add</button>
    </header>
    <section>
      {toDoLists.map(toDoList=> <ToDo key={toDoList.id} 
      id={toDoList.id}
      done={toDoList.done} 
      text={toDoList.text}
      getIdToDelete={getIdToDelete}
      getIdToUpdateDoneOrUndone={getIdToUpdateDoneOrUndone}
      getIdToUpdateText={getIdToUpdateText}
      />)}
    </section>
    <script src="app.js"></script>
  </div>
  )
}

export default App
