import { useState } from "react";
import { useReviews } from "../context/ReviewsContext";
import { useNavigate, useParams } from "react-router-dom";
// import './css/EditReviewPage.css'
import { AReview } from '../types/reviews.types';
import { useLogin } from "../context/LoginContext";
import editImage from '../assets/edit.png'

const EditReview = () => {
    
    const { singleReview, updateReview, deleteReview } = useReviews();
    const { checkJwt } = useLogin();
    const rating: string | undefined = singleReview?.rating.toString()

    const [editForm, setEditForm] = useState<AReview>({
        title: singleReview?.title,
        content: singleReview?.content,
        rating: rating,
    });

    const [errors, setErrors] = useState<AReview>({});
    const [reviewEdit, setReviewEdit] = useState(false);

    function hideReviewEdit() {
        setReviewEdit(false);
    }

    function revealReviewEdit() {
        setReviewEdit(true);
        // gör så värdena blir korrekta, annars blir de från förra singlereview, dum lösning men funkar
        setEditForm({
            title: singleReview?.title,
            content: singleReview?.content,
            rating: rating,
        });
    }

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
            await deleteReview(id, BookId);
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
            if (data.title.length >= 30) {
                validationErrors.title = "Titeln får max vara 30 tecken"
            }
        }

        if (!data.content) {
            validationErrors.content = "Fyll i innehåll"
        } else {
            if (data.content.length < 20) {
                validationErrors.content = "Recensionens innehåll måste minst vara 20 tecken långt"
            }
            if (data.content.length >= 200) {
                validationErrors.title = "Recensionens innehåll får max vara 200 tecken"
            }
        }


        return validationErrors;
    }

    // Kollar om JWT är giltig och sedan validerar formuläret
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

    // skapar ny review som skickas till funktion som uppdaterar review i databasen
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
            await updateReview(newReview);
            hideReviewEdit();
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
            {
                reviewEdit ? (
                    <div>
                        <form className="admin-form" onSubmit={EditReviewFormSubmit}>
                            <div>
                                <label htmlFor="title">Titel</label>
                                <textarea id="title" className="title-textarea" value={editForm.title} onChange={(event) => { setEditForm({ ...editForm, title: event.target.value }); }}></textarea>
                                {errors.title && <span className="form-error">{errors.title}</span>}
                            </div>
                            <div>
                                <label htmlFor="content">Innehåll</label>
                                <textarea id="content" className="content-textarea" value={editForm.content} onChange={(event) => { setEditForm({ ...editForm, content: event.target.value }); }}></textarea>
                                {errors.content && <span className="form-error">{errors.content}</span>}
                            </div>

                            <div>
                                <label htmlFor="rating">Rating</label>

                                <select name="rating" id="rating" value={editForm.rating} onChange={(event) => { setEditForm({ ...editForm, rating: event.target.value }); }}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <input type="submit" className="form-button" value="Spara" />
                        </form>
                        <button className="form-button del" onClick={() => {
                            deleteBtnClicked()
                        }}>Ta bort</button>
                    </div>
                ) : (
                    <button className="edit-button" onClick={revealReviewEdit}> <img src={editImage} alt="redigera recension" /> </button>
                )
            }

        </>
    )
}


export default EditReview
