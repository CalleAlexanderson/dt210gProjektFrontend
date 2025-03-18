import { Book } from "../types/book.types"
import './css/SinglePost.css'

const SingleBook = (props: Book) => {
  return (
    <>
      <div className="article-div">
        <h3 className="post-heading">{props.title}</h3>
      </div>
    </>
  )
}

export default SingleBook