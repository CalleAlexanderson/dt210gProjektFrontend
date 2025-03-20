import { useReviews } from "../context/ReviewsContext";
import { NavLink, useParams } from "react-router-dom";
import './css/Reviews.css'
import { useEffect } from "react";
import AddReview from "../components/AddReview";
import EditReview from "../components/EditReview";
import { useLogin } from "../context/LoginContext";

const SingleBookPage = () => {
  const { singleReview, getReview, reviews, getReviews } = useReviews();
  const date: string | undefined = singleReview?.date.toString().substring(0, 10)
  const rating: string | undefined = singleReview?.rating.toString()
  
    const { user } = useLogin();

  // laddar in post
  const params = useParams();
  let BookId = params.id;
  BookId = BookId?.substring(1, BookId.length)

  useEffect(() => {

    if (BookId) {
      getReview(BookId)
      getReviews(BookId)
    }
  }, [])

  return (
    <>
      { user ? (
        <div>
        <h2>Din review:</h2>
        {singleReview ? (

          <div>
            <h3>{singleReview.title}</h3>
            <p>{date}</p>
            <p>{singleReview.content}</p>
            <span>{rating}</span>
            {/* <NavLink to={`/editreview/:${singleReview._id}/:${books[0].id}`} className="nav-link">Redigera</NavLink> */}
            <div>
              <EditReview />
            </div>
            {/* <button onClick={}>Edit</button> */}
          </div>
        ) : (
          <div>
            {/* <NavLink to={`/addreview/:${BookId}`} className="nav-link">review</NavLink> */}
            <AddReview />
          </div>

        )}
      </div>
      ) : (
        <div><p><NavLink to={`/login`} className="nav-link">Logga in</NavLink> för att skriva en review</p></div>
      )
    }
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
                <p>{review.content}</p>
                <p>{review.rating}</p>
              </li>
            )) : <p>Inga reviews hittades</p>
        }
      </ul>
    </>
  )
}

export default SingleBookPage