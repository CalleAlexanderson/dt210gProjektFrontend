import { Book } from "../types/book.types"
import './css/SinglePost.css'

const SingleBook = (props: Book) => {
  let desc: string = "Ingen sammanfattning hittades";
  if (props.description) {
    if (props.description.length >= 400) {
      desc = props.description.substring(0, 400);
      desc += " ..."
    } else {
      desc = props.description;
    }
  }
  return (
    <>
      <div className="article-div">
        <div>
          {
            props.image ? (
              <img src={props.image} alt="" />) : (
              <img src="" alt="" />
            )
          }
          <h3 className="">{props.title}</h3>
        </div>
        <p className="article-div-desc" dangerouslySetInnerHTML={{ __html: desc }}></p>
      </div>
    </>
  )
}

export default SingleBook