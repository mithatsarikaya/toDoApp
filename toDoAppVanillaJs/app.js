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
    text: "",
    done: false,
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
            class="article--image--undo ${!d.done ? "done" : ""}"
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

//give two parameters.first node second the string nodeName like div like article
const getImmediateParentNode = (el, whichNode) => {
  while (el.nodeName !== whichNode.toUpperCase()) {
    el = el.parentNode;
  }
  return el;
};

const deleteToDo = () => {
  ///////////////////////////DELETE ToDO
  const deleteIcons = document.querySelectorAll(".article--image--trash");

  //find the immediate parent 'article' get the id delete from html and data

  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", (e) => {
      //   let elParentNode = e.target.parentNode;
      //   //get immedite parent article which has id
      //   while (elParentNode.nodeName !== "ARTICLE") {
      //     elParentNode = elParentNode.parentNode;
      //   }

      let elParentNode = getImmediateParentNode(e.target, "article");

      let idToBeDeleted = elParentNode.dataset.id;

      let data = getDataFromLocalStorage();
      data = data.filter((d) => d.id !== idToBeDeleted);
      setDataToLocalStorage(data);
      elParentNode.remove();
      if (data.length === 0) {
        localStorage.clear();
      }
    });
  });
};
deleteToDo();

//EDIT IF TEXT CHANGEEEEE
const editIfTextChange = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) =>
    input.addEventListener("input", (e) => {
      let idToBeUpdated = e.target.dataset.id;
      let data = getDataFromLocalStorage();
      data = data.map((d) =>
        d.id === idToBeUpdated ? { ...d, text: e.target.value } : d
      );
      setDataToLocalStorage(data);
    })
  );
};

editIfTextChange();

//for done and undone images. done image has 'check' inside his classname value.
const clickCheckOrUndone = (nodeEl) => {
  //if user clicked checked (or done image, i should have name that check pfffff)
  if (nodeEl.classList.value.includes("check")) {
    nodeEl.classList.add("done");
    nodeEl.nextElementSibling.classList.remove("done");
    nodeEl.parentNode.previousElementSibling.classList.add("done");
  } else {
    nodeEl.classList.add("done");
    nodeEl.previousElementSibling.classList.remove("done");
    nodeEl.parentNode.previousElementSibling.classList.remove("done");
  }
};

//EDIT IF DONE or UNDONE img clicked

const careDoneOrUndone = () => {
  const doneImages = document.querySelectorAll(".article--image--check");

  doneImages.forEach((doneImage) =>
    doneImage.addEventListener("click", (e) => {
      // (e.target.parentNode.parentNode.dataset.id)
      let articleNote = getImmediateParentNode(e.target, "article");
      let idToBeUpdated = articleNote.dataset.id;
      let data = getDataFromLocalStorage();
      data = data.map((d) =>
        d.id === idToBeUpdated ? { ...d, done: !d.done } : d
      );
      setDataToLocalStorage(data);

      //find the immediate undo img
      clickCheckOrUndone(e.target);
    })
  );

  const undoneImages = document.querySelectorAll(".article--image--undo");

  undoneImages.forEach((undoneImage) =>
    undoneImage.addEventListener("click", (e) => {
      // (e.target.parentNode.parentNode.dataset.id)
      let articleNote = getImmediateParentNode(e.target, "article");
      let idToBeUpdated = articleNote.dataset.id;
      let data = getDataFromLocalStorage();
      data = data.map((d) =>
        d.id === idToBeUpdated ? { ...d, done: !d.done } : d
      );
      setDataToLocalStorage(data);

      clickCheckOrUndone(e.target);
      //find the immediate undo img
    })
  );
};
careDoneOrUndone();
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
  deleteToDo();
  editIfTextChange();
  careDoneOrUndone();
});
