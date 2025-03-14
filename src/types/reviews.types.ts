// blogginlägg
export interface Review {
    _id: string,
    title: string,
    author: string,
    content: string,
    date: Date
}

// lägg till blogginlägg
export interface AReview {
    title?: string,
    content?: string
}

// uppdatera blogginlägg
export interface UReview {
    _id?: string,
    title?: string,
    content?: string
}

// används för att skapa ReviewsContext
export interface ReviewsContextType {
    reviews: Review[],
    singleReview: Review | null,
    getReviews: () => Promise<void>; // Review[]
    getReview: (id: string) => Promise<void>;
    addReview: (aReview: AReview) => Promise<void>;
    updateReview: (uReview: UReview) => Promise<void>;
    deleteReview: (dReview: Review) => Promise<void>;
}