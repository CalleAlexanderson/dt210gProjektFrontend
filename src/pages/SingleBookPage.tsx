import { useReviews } from "../context/ReviewsContext";
import { useBook } from "../context/BookContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import './css/SinglepostPage.css'
import { useEffect } from "react";
import { BookParameter } from "../types/book.types";
import AddReview from "../components/AddReview";
import EditReview from "../components/EditReview";

const SingleBookPage = () => {
  const { singleReview, getReview, reviews, getReviews } = useReviews();
  const { getBook, books } = useBook();
  const date: string | undefined = singleReview?.date.toString().substring(0, 10)
  const rating: string | undefined = singleReview?.rating.toString()
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
      console.log("DSADASDASD");

      getReview(BookId)
      getBook(para)
      getReviews(BookId)
      console.log(singleReview);
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
      <div>
        <h2>Din review:</h2>
        {singleReview ? (

          <div>
            <h3>{singleReview.title}</h3>
            <p>{date}</p>
            <p>{singleReview.content}</p>
            <span>{rating}</span>
            {/* <NavLink to={`/editreview/:${singleReview._id}/:${books[0].id}`} className="nav-link">Redigera</NavLink> */}
            <EditReview />
          </div>
        ) : (
          <div>
            {/* <NavLink to={`/addreview/:${BookId}`} className="nav-link">review</NavLink> */}
            <AddReview />
          </div>

        )}
      </div>
      <h2>Reviews: </h2>
      <p>Antal reviews: {reviews.length}</p>
      <ul>
        {
          // Kollar så books inte är tom
          reviews.length > 0 ?
            reviews.map((review) => (
              <li key={review._id}>
                <h3>{review.title}</h3>
                <p>{review.username}</p>
                <p>{review.date?.toString()}</p>
                <p>{review.rating}</p>
              </li>
            )) : <p>Inga reviews hittades</p>
        }
      </ul>
    </article>
  )
}

export default SingleBookPage