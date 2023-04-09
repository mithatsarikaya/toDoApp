import check from "/check-solid.svg"
import undo from "/arrow-rotate-left-solid.svg"
import trash from "/trash-solid.svg"


export default function ToDo (props){
    return (
        <article >
        <input
          className={props.done ? "done" : ""}
          type="text"
          value={props.text}
          placeholder={props.text ? "" : 'What to do?'}
          onChange={(e)=>props.getIdToUpdateText(e,props.id)}
        />
        <div className="article--images">
          <img
            className={`article--image--check ${props.done ? "done" : ""}`}
            // className="article--image--check"
            src={check}
            alt="check"
            onClick={()=>props.getIdToUpdateDoneOrUndone(props.id)}
          />
          <img
            className={`article--image--undo ${!props.done ? "done" : ""}`}
            src={undo} 
            alt="undo"
            onClick={()=>props.getIdToUpdateDoneOrUndone(props.id)}
          />
          <img
            className="article--image--trash"
            src={trash}
            alt="trash"
            onClick={()=>props.getIdToDelete(props.id)}
          />
        </div>
      </article>
    )
}