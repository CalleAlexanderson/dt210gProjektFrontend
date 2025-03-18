import { useReviews } from "../context/ReviewsContext";
import { useBook } from "../context/BookContext";
import { useNavigate, useParams } from "react-router-dom";
import './css/SinglepostPage.css'
import { useEffect } from "react";
import { BookParameter } from "../types/book.types";

const SingleBookPage = () => {
  const { singleReview, getReview } = useReviews();
  const { getBook, books } = useBook();
  const date: string | undefined = singleReview?.date.toString().substring(0, 10)
  const navigate = useNavigate();


  // laddar in post
  const params = useParams();
  let BookId = params.id;
  BookId = BookId?.substring(1, BookId.length)

  useEffect(() => {
    if (BookId) {
      console.log("funkar");
      
      // getReview(BookId)
      const para: BookParameter = {
        q: BookId,
      };
     getBook(para)
     getReview(BookId)
    }
  }, [])
  
  return (
    <article className="singlepost-article">
      <p role="link" className="return-blog" onClick={() => {
        navigate('/books');
      }}>➦</p>
      <h1 className="singlepost-heading">{books[0]?.title}</h1>
      <div className="author-date single-a-d">
        <p>{books[0]?.authors}</p>
        <p>{date}</p>
      </div>
      <p className="singlepost-content">{books[0]?.description}</p>
      <div>
        <p>Din review:</p>
      </div>
      <ul>
        
      </ul>
    </article>
  )
}

export default SingleBookPage