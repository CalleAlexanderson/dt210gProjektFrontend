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
    <article className="singlebook-article">
      <p role="link" className="return-blog" onClick={() => {
        navigate('/books');
      }}>➦</p>
      <div className="singlebook-content">
        <div className="singlebook-img-information">
          {
            books[0]?.image ? (
              <img src={books[0].image} alt="bokens framsida" />
            ) : (
              <img src="https://placehold.co/300x600?text=Image\n+not+Found" alt="ingen bild hittades" />
            )
          }


          <section className="singlebook-information">
            <div className="singlebook-heading singlebook-mobile-h1">
              <h1 className="">{books[0]?.title}</h1>
              <p>av <b>{books[0]?.authors}</b></p>
            </div>
            
            <div className="singlebook-date">
              <p>Utgivningsdatum:</p>
              <p> {
                books[0]?.publishedDate ? (books[0]?.publishedDate) : (<span>?</span>)
              }</p>
            </div>

            <div className="singlebook-page">
              <p>Antal sidor:</p>
              <p> {
                books[0]?.pageCount ? (books[0]?.pageCount) : (<span>?</span>)
              }</p>
            </div>

            <div className="singlebook-google-info">
              <p>Google rating:  {
                books[0]?.averageRating ? (books[0]?.averageRating) : (<span>?</span>)
              }
                /5</p>
              <p>Google reviews:   {
                books[0]?.ratingsCount ? (books[0]?.ratingsCount) : (<span>?</span>)
              }</p>
            </div>
          </section>
        </div>
        <div className="singlebook-desc" >
          <div className="singlebook-heading singlebook-pc-h1">
            <h1 className="">{books[0]?.title}</h1>
            <p>av <b>{books[0]?.authors}</b></p>
          </div>
          <p dangerouslySetInnerHTML={{ __html: books[0]?.description }}></p>
        </div>
      </div>
      <Reviews />
    </article>
  )
}

export default SingleBookPage