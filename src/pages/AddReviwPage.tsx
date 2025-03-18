import React from 'react'
import { useState } from "react";
import { useReviews } from "../context/ReviewsContext";
import { useNavigate, useParams } from "react-router-dom";
import './css/EditPostPage.css'
import { AReview, Review } from '../types/reviews.types';
import { useLogin } from '../context/LoginContext';

const AddReviewPage = () => {

    const { addReview } = useReviews();
    const navigate = useNavigate();

    const [createForm, setCreateForm] = useState<AReview>({
        title: '',
        content: '',
        rating: '1',
    });

    // laddar in bookid
    const params = useParams();
    let BookId = params.id;
    BookId = BookId?.substring(1, BookId.length)

    const [errors, setErrors] = useState<AReview>({});

    // validerar formuläret
    const validateForm = (data: AReview) => {
        const validationErrors: AReview = {};

        // if (!data.title) {
        //     validationErrors.title = "Fyll i titel"
        // } else {
        //     if (data.title.length < 3) {
        //         validationErrors.title = "Titeln måste vara minst 3 tecken"
        //     }
        // }

        // if (!data.content) {
        //     validationErrors.content = "Fyll i innehåll"
        // } else {
        //     if (data.content.length < 50) {
        //         validationErrors.content = "Blogginläggets innehåll måste minst vara 50 tecken långt"
        //     }
        // }

        return validationErrors;
    }

    // anropar login från LoginContext
    const AddReviewFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(createForm);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            updateDb();
        }

    }

    const [message, setMessage] = useState('');
    const updateDb = async () => {
        console.log("uppdaterar db");
        try {
            let newReview: AReview = {
                bookId: BookId,
                title: createForm.title,
                content: createForm.content,
                rating: createForm.rating,
            }
            await addReview(newReview);
            setCreateForm({
                title: '',
                content: '',
                rating: '1',
            });
            setMessage('Review skapad')
        } catch (error) {
            setCreateForm({
                title: '',
                content: '',
                rating: '1',
            });
        }
    };


    return (
        <>
            <form className="admin-form" onSubmit={AddReviewFormSubmit}>
                <p role="link" className="return-blog" onClick={() => {
                    navigate(`/book/${BookId}`);
                }}>➦</p>
                <h1>Skriv review</h1>
                <h2>{message}</h2>
                <div>
                    <label htmlFor="title">Titel</label>
                    <input type="text" id="title" required autoComplete="off" value={createForm.title} onChange={(event) => { setCreateForm({ ...createForm, title: event.target.value }); }} />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                </div>

                <div>
                    <label htmlFor="title">Innehåll</label>
                    <input type="text" id="title" required autoComplete="off" value={createForm.content} onChange={(event) => { setCreateForm({ ...createForm, content: event.target.value }); }} />
                    {errors.content && <span className="form-error">{errors.content}</span>}
                </div>

                <label htmlFor="rating">Rating</label>
                <select name="rating" id="rating" onChange={(event) => { setCreateForm({ ...createForm, rating: event.target.value }); }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input type="submit" value="Skapa" />
            </form>
        </>
    )
}

export default AddReviewPage