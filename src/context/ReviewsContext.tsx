import { createContext, useState, useContext, ReactNode } from "react";
import { ReviewsContextType, Review, UReview, AReview } from "../types/reviews.types";
import { useLogin } from "./LoginContext";
import { BookParameter } from "../types/book.types";


const ReviewsContext = createContext<ReviewsContextType | null>(null);

interface ReviewsProviderProps {
    children: ReactNode
}

export const ReviewsProvider: React.FC<ReviewsProviderProps> = ({ children }) => {


    const [reviews, setReviews] = useState<Review[]>([]);
    const [singleReview, setSingleReview] = useState<Review | null>(null);
    const {user} = useLogin();

    // hämtar Reviews
    const getReviews = async (id: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/reviews/${id}`)

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as Review[];
            console.log("data:");
            
            console.log(data);
            
            setReviews(data);
            
        } catch (error) {
            throw error;
        }
    }

    // hämtar enskild Review
    const getReview = async (id: string) => {
        try {
            console.log(id);
            
            const response = await fetch(`http://127.0.0.1:3000/review/${id}/${user?.username}`)

            if (!response.ok) {
                throw new Error;
            }
            console.log(response);
            
            const data = await response.json() as Review;

            setSingleReview(data);
            console.log(data);
            
        } catch (error) {
            throw error;
        }
    }

    // lägga till en Review
    const addReview = async (aReview: AReview) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')
        console.log(key);
        console.log(aReview);
        console.log("review title: "+aReview.title);
        console.log(user?.username);
        
        
        
        try {
            const response = await fetch(`http://127.0.0.1:3000/add/review`, {
                method: "POST",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ 
                    bookid: aReview.bookId,
                    title: aReview.title,
                    username: user?.username,
                    content: aReview.content,
                    rating: aReview.rating
                })
            })

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as any;
            console.log(data);
            if (aReview.bookId) {
                await getReview(aReview.bookId);
                await getReviews(aReview.bookId);
            }
        } catch (error) {
            throw error;
        }
    }

    // uppdatera en Review
    const updateReview = async (uReview: UReview) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')
        console.log("id: "+uReview._id);
        
        try {
            
            const response = await fetch(`http://127.0.0.1:3000/update/${uReview._id}`, {
                method: "PUT",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ 
                    title: uReview.title,
                    content: uReview.content,
                    rating: uReview.rating
                })
            })

            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as any;
            console.log(data);
            console.log(uReview.bookId);
            
            if (uReview.bookId) {
                await getReview(uReview.bookId);
                await getReviews(uReview.bookId);
            }


        } catch (error) {
            throw error;
        }
    }

    // ta bort en Review
    const deleteReview = async (id: string | undefined, bookid: string | undefined) => {
        let key: string = "Bearer " + localStorage.getItem('jwt')

        try {
            const response = await fetch(`http://127.0.0.1:3000/delete/review/${id}`, {
                method: "DELETE",
                headers: {
                    'authorization': key
                }
            })

            if (!response.ok) {
                throw new Error;
            }
            const data = await response.json() as any;

            if (!data.deleted) {
                throw new Error
            }
            
            if (bookid) {
                await getReview(bookid);
                await getReviews(bookid);
            }
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