// blogginlägg
export interface Review {
    _id: string,
    bookId: string,
    title: string,
    username: string,
    content: string,
    rating: number,
    date: Date
}

// lägg till blogginlägg
export interface AReview {
    bookId?: string,
    title?: string,
    content?: string,
    rating?: string
}

// uppdatera blogginlägg
export interface UReview {
    _id?: string,
    bookId?: string,
    title?: string,
    content?: string,
    rating?: string
}

// används för att skapa ReviewsContext
export interface ReviewsContextType {
    reviews: Review[],
    singleReview: Review | null,
    getReviews: (id: string) => Promise<void>;
    getReview: (id: string) => Promise<void>;
    addReview: (aReview: AReview) => Promise<void>;
    updateReview: (uReview: UReview) => Promise<void>;
    deleteReview: (id: string | undefined) => Promise<void>;
}