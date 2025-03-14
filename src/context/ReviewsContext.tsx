import { createContext, useState, useContext, ReactNode } from "react";
import { ReviewsContextType, Review, UReview, AReview } from "../types/reviews.types";
import { useLogin } from "./LoginContext";


const ReviewsContext = createContext<ReviewsContextType | null>(null);

interface ReviewsProviderProps {
    children: ReactNode
}

export const ReviewsProvider: React.FC<ReviewsProviderProps> = ({ children }) => {


    const [reviews, setReviews] = useState<Review[]>([]);
    const [singleReview, setSingleReview] = useState<Review | null>(null);
    const {user} = useLogin();

    // hämtar Reviews
    const getReviews = async () => {

        try {
            const response = await fetch("http://127.0.0.1:3000/reviews")

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as Review[];

            setReviews(data);
        } catch (error) {
            throw error;
        }
    }

    // hämtar enskild Review
    const getReview = async (id: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/Review/${id}`)

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as Review;
            console.log(data);

            setSingleReview(data);
        } catch (error) {
            throw error;
        }
    }

    // lägga till en Review
    const addReview = async (aReview: AReview) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')
        try {
            const response = await fetch(`http://127.0.0.1:3000/add/Review`, {
                method: "Review",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ 
                    title: aReview.title,
                    author: user?.username,
                    content: aReview.content,
                })
            })

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as any;
            console.log(data);
        } catch (error) {
            throw error;
        }
    }

    // uppdatera en Review
    const updateReview = async (uReview: UReview) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')
        try {
            const response = await fetch(`http://127.0.0.1:3000/update/${uReview._id}`, {
                method: "PUT",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ 
                    title: uReview.title,
                    content: uReview.content,
                })
            })

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as any;
            console.log(data);


            getReviews();
        } catch (error) {
            throw error;
        }
    }

    // ta bort en Review
    const deleteReview = async (dReview: Review) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')
        try {
            const response = await fetch(`http://127.0.0.1:3000/delete/${dReview._id}`, {
                method: "DELETE",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ role: user?.role})
            })

            if (!response.ok) {
                throw new Error;
            }
            const data = await response.json() as any;

            if (!data.deleted) {
                throw new Error
            }
            getReviews();
        } catch (error) {
            throw error;
        }
    }

    return (
        <ReviewsContext.Provider value={{ getReviews, getReview, addReview, updateReview, deleteReview, reviews, singleReview }}>
            {
                children
            }
        </ReviewsContext.Provider>
    )
}

// låter andra filer använda ReviewsContext
export const useReviews = (): ReviewsContextType => {
    const context = useContext(ReviewsContext);

    if (!context) {
        throw new Error("useReviews måste har ReviewsProvider");
    }

    return context;
}