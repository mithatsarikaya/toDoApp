import check from "../../public/check-solid.svg"
import undo from "../../public/arrow-rotate-left-solid.svg"
import trash from "../../public/check-solid.svg"


export default function ToDo (){
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
            srcset=""
          />
          <img
            className="article--image--undo"
            src={undo}
            alt="undo"
            srcset=""
          />
          <img
            className="article--image--trash"
            src={trash}
            alt="trash"
            srcset=""
          />
        </div>
      </article>
    )
}