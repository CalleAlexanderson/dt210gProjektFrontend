import { useReviews } from "../context/ReviewsContext";
import { NavLink, useParams } from "react-router-dom";
import './css/Reviews.css'
import { createElement, useEffect, useState } from "react";
import AddReview from "../components/AddReview";
import EditReview from "../components/EditReview";
import { useLogin } from "../context/LoginContext";

const Review = () => {
  const { singleReview, getReview, reviews, getReviews } = useReviews();

  const { user } = useLogin();

  // laddar in post
  const params = useParams();
  let BookId = params.id;
  BookId = BookId?.substring(1, BookId.length)

  function reviewsCount(rating: number) {
    let spans: string[] = [];
    for (let index = 0; index < rating; index++) {
      let span: string = 'rating-span';
      spans.push(span);
    }
    return spans;
  }

  useEffect(() => {
    if (BookId) {
      getReview(BookId)
      getReviews(BookId)
    }
  }, [])

  return (
    <>
      {user ? (
        <div>
          <h2>Din review:</h2>
          {singleReview ? (

            <div className="your-review-div">
              {
                <div className="rating-div">{reviewsCount(singleReview.rating).map((rate, index) => (

                  <span className={rate} key={index}></span>

                ))}</div>
              }
              <h3 className="review-title">{singleReview.title}</h3>
              <p className="review-author">av {singleReview.username}</p>
              <p className="review-date">{singleReview.date?.toString().substring(0, 10)}</p>

              <p className="review-content">{singleReview.content}</p>
              {/* <EditReview _id={singleReview._id} bookId={singleReview.bookId} title={singleReview.title} 
              username={singleReview.username} content={singleReview.content} rating={singleReview.rating} date={singleReview.date} /> */}
              <EditReview />
            </div>
          ) : (
            <div>
              <AddReview />
            </div>

          )}
        </div>
      ) : (
        <div><p><NavLink to={`/login`} className="nav-link">Logga in</NavLink> för att skriva en review</p></div>
      )
      }
      <section className="all-reviews">
        {
          reviews.length == 1 ?
            (<h2>{reviews.length} Review: </h2>) : (<h2>{reviews.length} Reviews: </h2>)
        }
        <ul>
          {
            // Kollar så books inte är tom
            reviews.length > 0 ?
              reviews.map((review) => (
                <li className="review" key={review._id}>
                  {
                    <div className="rating-div">{reviewsCount(review.rating).map((rate, index) => (

                      <span className={rate} key={index}></span>

                    ))}</div>
                  }
                  <h3 className="review-title">{review.title}</h3>
                  <p className="review-author">av {review.username}</p>
                  <p className="review-date">{review.date?.toString().substring(0, 10)}</p>

                  <p className="review-content">{review.content}</p>
                </li>
              )) : <p>Inga reviews hittades</p>
          }
        </ul>
      </section>
    </>
  )
}

export default Review