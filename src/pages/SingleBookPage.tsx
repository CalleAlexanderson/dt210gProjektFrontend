import { useBook } from "../context/BookContext";
import { useNavigate, useParams } from "react-router-dom";
import './css/SinglepostPage.css'
import { useEffect } from "react";
import { BookParameter } from "../types/book.types";
import Reviews from "../components/Reviews";

const SingleBookPage = () => {
  const { getBook, books } = useBook();
  const navigate = useNavigate();

  // laddar in post
  const params = useParams();
  let BookId = params.id;
  BookId = BookId?.substring(1, BookId.length)

  useEffect(() => {

    if (BookId) {

      // getReview(BookId)
      const para: BookParameter = {
        q: BookId,
      };

      getBook(para)
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
        <p>Utgivningsdatum:  {
          books[0]?.publishedDate ? (books[0]?.publishedDate) : (<span>?</span>)
        }</p>
        <p>Antal sidor:  {
          books[0]?.pageCount ? (books[0]?.pageCount) : (<span>?</span>)
        }</p>
      </div>
      <div>
        <p>Google rating:  {
          books[0]?.averageRating ? (books[0]?.averageRating) : (<span>?</span>)
        }
          /5</p>
        <p>Google reviews:   {
          books[0]?.ratingsCount ? (books[0]?.ratingsCount) : (<span>?</span>)
        }</p>
      </div>
      <p className="singlepost-content" dangerouslySetInnerHTML={{ __html: books[0]?.description }}></p>
      <Reviews />
    </article>
  )
}

export default SingleBookPage