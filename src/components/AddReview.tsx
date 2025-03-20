import React from 'react'
import { useState } from "react";
import { useReviews } from "../context/ReviewsContext";
import { useNavigate, useParams } from "react-router-dom";
// import './css/EditReviewPage.css'
import { AReview } from '../types/reviews.types';
import { useLogin } from '../context/LoginContext';

const AddReview = () => {

    const { addReview, getReview } = useReviews();
    const navigate = useNavigate();
    const { checkJwt } = useLogin();

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

    const checkIfReview = async (id: string | undefined) => {
        if (id) {
            await getReview(id);
        }
    }

    // anropar login från LoginContext
    const AddReviewFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Om sidan laddas om så visas inte din egna review, denna uppdaterar så att den visas
        // görs även on click på input elementen 
        checkIfReview(BookId);
        
        
        if (await checkJwt() == false) {
            navigate('/login')
        }
        const validationErrors = validateForm(createForm);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            updateDb();
        }

    }
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
                <h1>Skriv review</h1>
                <div>
                    <label htmlFor="title">Titel</label>
                    <textarea id="title" className="title-textarea" value={createForm.title} onClick={()=> {checkIfReview(BookId)}} onChange={(event) => { setCreateForm({ ...createForm, title: event.target.value }); }}></textarea>
                    {errors.title && <span className="form-error">{errors.title}</span>}
                </div>

                <div>
                    <label htmlFor="content">Innehåll</label>
                    <textarea id="content" className="content-textarea" value={createForm.content} onClick={()=> {checkIfReview(BookId)}} onChange={(event) => { setCreateForm({ ...createForm, content: event.target.value }); }}></textarea>
                    {errors.content && <span className="form-error">{errors.content}</span>}
                </div>

                <div>
                    <label htmlFor="rating">Rating</label>
                    <select name="rating" id="rating" onChange={(event) => { setCreateForm({ ...createForm, rating: event.target.value }); }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <input type="submit" value="Skapa" />
            </form>
        </>
    )
}

export default AddReview