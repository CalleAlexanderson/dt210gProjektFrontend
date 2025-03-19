// användaren
export interface Book {
    id: string,
    title?: string,
    authors?: string[],
    publishedDate?: string,
    description: string,
    categories?: string[],
    pageCount?: number,
    averageRating?: number,
    ratingsCount?: number,
    image?: string | null
}

// det som skickas med i getBooks
export interface BookParameter {
    q?: string
}

// används för att skapa LoginContext
export interface BookContextType {
    books: Book[], 
    getBooks: (bookParameter: BookParameter) => Promise<void>;
    getBook: (bookParameter: BookParameter) => Promise<void>;
}