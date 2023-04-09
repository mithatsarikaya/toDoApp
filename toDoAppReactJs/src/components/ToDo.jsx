import check from "/check-solid.svg"
import undo from "/arrow-rotate-left-solid.svg"
import trash from "/trash-solid.svg"


export default function ToDo (props){
    return (
        <article >
        <input
          className=""
          type="text"
          placeholder='What to do?'
        />
        <div className="article--images">
          <img
            className="article--image--check"
            src={check}
            alt="check"
          />
          <img
            className="article--image--undo"
            src={undo} 
            alt="undo"
          />
          <img
            className="article--image--trash"
            src={trash}
            alt="trash"
            onClick={props.getIdToDelete(props.key)}
          />
        </div>
      </article>
    )
}