//generating random id for pairing text areas and header divs
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
    text: "yapilacak bir",
    done: true,
  };

  return data;
};

const section = document.querySelector("section");

//get data from local storage, in order to use as an object we need to parse it
const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("data"));

//set data to local storage, in order to save it we need to stringfy our object
const setDataToLocalStorage = (data) =>
  localStorage.setItem("data", JSON.stringify(data));

const createElementsFromData = () => {
  //need this line to rerender section.innerHTML
  let data = getDataFromLocalStorage();
  console.log(data?.length);
  if (data) {
    section.innerHTML = "";
    data.map(
      (d) =>
        (section.innerHTML += `
  <article data-id=${d.id}>
        <input
          data-id=${d.id}
          class="${d.done ? "done" : ""}"
          type="text"
          ${d.text ? `value=${d.text}` : "placeholder='What to do?'"}
          ${d.done ? "readonly" : ""}
        />
        <div class="article--images">
          <img
            class="article--image--check ${d.done ? "done" : ""}"
            src="check-solid.svg"
            alt="check"
            srcset=""
          />
          <img
            class="article--image--undo"
            src="arrow-rotate-left-solid.svg"
            alt="check"
            srcset=""
          />
          <img
            class="article--image--trash"
            src="trash-solid.svg"
            alt="trash"
            srcset=""
          />
        </div>
      </article>
  `)
    );
  }
};

createElementsFromData();

//add button
const addButton = document.querySelector(".header--button");

//when user adds new todo
addButton.addEventListener("click", () => {
  let data = getDataFromLocalStorage();
  if (data) {
    let newData = generateBlankDataToDo();
    data.push(newData);
    setDataToLocalStorage(data);
    createElementsFromData();
  } else {
    data = [generateBlankDataToDo()];
    setDataToLocalStorage(data);
    createElementsFromData();
  }
});
