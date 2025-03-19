import { useState } from "react";
import { useReviews } from "../context/ReviewsContext";
import { useNavigate, useParams } from "react-router-dom";
// import './css/EditReviewPage.css'
import { AReview } from '../types/reviews.types';
import { useLogin } from "../context/LoginContext";

const EditReviewPage = () => {
    const { singleReview, updateReview, deleteReview, getReview, getReviews } = useReviews();
    const { checkJwt } = useLogin();
    const rating: string | undefined = singleReview?.rating.toString()

    const [editForm, setEditForm] = useState<AReview>({
        title: singleReview?.title,
        content: singleReview?.content,
        rating: rating,
    });

    const [errors, setErrors] = useState<AReview>({});
    // const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const params = useParams();
    let BookId = params.id;
    BookId = BookId?.substring(1, BookId.length)
    let id = singleReview?._id;

    const [deleteConfirmDivClass, setdeleteConfirmDivClass] = useState('delete-confirm-div hidden');
    // const [error, setError] = useState('');

    const deleteBtnClicked = async () => {
        console.log("funkar");
        if (await checkJwt() == false) {
            navigate('/login')
        }
        setdeleteConfirmDivClass('delete-confirm-div');
    }

    const deleteConfirmed = async () => {
        // setError('');
        setdeleteConfirmDivClass('delete-confirm-div hidden');
        try {
            await deleteReview(id);
            // navigate(`/book/${bookid}`);
        } catch (error) {
            // window.scrollTo({
            //     top: 0,
            //     behavior: "smooth"
            // });
            // setError("Du har inte befogenhet att ta bort blogginlägg")
        }
    }

    // validerar formuläret
    const validateForm = (data: AReview) => {
        const validationErrors: AReview = {};


        if (!data.title) {
            validationErrors.title = "Fyll i titel"
        } else {
            if (data.title.length < 3) {
                validationErrors.title = "Titeln måste vara minst 3 tecken"
            }
        }

        if (!data.content) {
            validationErrors.content = "Fyll i innehåll"
        } else {
            if (data.content.length < 20) {
                validationErrors.content = "Blogginläggets innehåll måste minst vara 20 tecken långt"
            }
        }


        return validationErrors;
    }

    const EditReviewFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (await checkJwt() == false) {
            navigate('/login')
        }
        const validationErrors = validateForm(editForm);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            updateDb();
        }
    }

    // Uppdaterar todos i databasen genom api
    const updateDb = async () => {
        console.log("funkar");

        try {
            let newReview = {
                _id: id,
                bookId: BookId,
                title: editForm.title,
                content: editForm.content,
                rating: editForm.rating
            }
            console.log(newReview);

            await updateReview(newReview);
        } catch (error) {
            setEditForm({
                title: '',
                content: '',
                rating: '1',
            });
        }
    };


    return (
        <>
            <div className={deleteConfirmDivClass}>
                <p>Vill du verkligen ta bort inlägget "{editForm.title}"?</p>
                <button className="delete-yes" onClick={() => {
                    deleteConfirmed();
                }}>Ja</button>
                <button className="delete-no" onClick={() => {
                    setdeleteConfirmDivClass('delete-confirm-div hidden');
                }}
                >Nej</button>
            </div>
            <form className="admin-form" onSubmit={EditReviewFormSubmit}>
                {/* <h2>{message}</h2> */}
                <div>
                    <label htmlFor="title">Titel</label>
                    <input type="text" id="title" autoComplete="off" value={editForm.title} onChange={(event) => { setEditForm({ ...editForm, title: event.target.value }); }} />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                </div>
                <div>
                    <label htmlFor="content">Innehåll</label>
                    <textarea id="content" value={editForm.content} onChange={(event) => { setEditForm({ ...editForm, content: event.target.value }); }}></textarea>
                    {errors.content && <span className="form-error">{errors.content}</span>}
                </div>

                <label htmlFor="rating">Rating</label>

                <select name="rating" id="rating" value={editForm.rating} onChange={(event) => { setEditForm({ ...editForm, rating: event.target.value }); }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <input type="submit" value="Spara" />
            </form>
            <button className="admin-btn del" onClick={() => {
                deleteBtnClicked()
            }}>Ta bort</button>
        </>
    )
}


export default EditReviewPage
