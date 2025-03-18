import { useState } from "react";
import { useReviews } from "../context/ReviewsContext";
import { useNavigate, useParams } from "react-router-dom";
import './css/EditReviewPage.css'
import { AReview } from '../types/reviews.types';

const EditReviewPage = () => {
    const { singleReview, updateReview } = useReviews();

    const [editForm, setEditForm] = useState<AReview>({
        title: singleReview?.title,
        content: singleReview?.content,
    });

    const [errors, setErrors] = useState<AReview>({});

    const navigate = useNavigate();
    let { id } = useParams()
    id = id?.substring(1, id.length);

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
            if (data.content.length < 50) {
                validationErrors.content = "Blogginläggets innehåll måste minst vara 50 tecken långt"
            }
        }


        return validationErrors;
    }

    const EditReviewFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

        try {
            let newReview = {
                _id: id,
                title: editForm.title,
                content: editForm.content
            }
            await updateReview(newReview);
            navigate("/admin")
        } catch (error) {
            setEditForm({
                title: "",
                content: "",
            });
        }
    };


    return (
        <>
            <form className="admin-form" onSubmit={EditReviewFormSubmit}>
                <p role="link" className="return-blog" onClick={() => {
                    navigate('/admin');
                }}>➦</p>
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
                <input type="submit" value="Spara" />
            </form>
        </>
    )
}

export default EditReviewPage