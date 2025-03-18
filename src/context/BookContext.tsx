import { createContext, useContext, ReactNode, useState } from "react";
import { BookContextType, BookParameter, Book } from "../types/book.types";

const BookContext = createContext<BookContextType | null>(null);

interface BookProviderProps {
    children: ReactNode
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
    // const [book, setBook] = useState<Book | null>(null);
    const [books, setBooks] = useState<Book[]>([]);

    // hämta från google api
    const getBooks = async (bookParameter: BookParameter) => {
        // AIzaSyAYUM0ItO089WvCjYZ0M8Lb2EHoJoXBbGY
        // AIzaSyAxmnVjCW6h9_LubNKl2BO9w_zhMacxLUo
        let url: string = `https://www.googleapis.com/books/v1/volumes?q=${bookParameter.q}&key=AIzaSyAYUM0ItO089WvCjYZ0M8Lb2EHoJoXBbGY`
        console.log(url);

        try {
            const response = await fetch(url)


            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as any;
            setBooks([]);
            console.log(data);
            // console.log(data.items.length);
            let newBooks: Book[] = []
            for (let index = 0; index < data.items.length; index++) {
                let img: string | null;
                if (typeof data.items[index].volumeInfo.imageLinks == "undefined") {
                    img = null
                } else {
                    img = data.items[index].volumeInfo.imageLinks.thumbnail;
                }

                let newBook: Book = {
                    id: data.items[index].id,
                    title: data.items[index].volumeInfo.title,
                    authors: data.items[index].volumeInfo.authors,
                    publishedDate: data.items[index].volumeInfo.publishedDate,
                    description: data.items[index].volumeInfo.description,
                    categories: data.items[index].volumeInfo.categories,
                    pageCount: data.items[index].volumeInfo.pageCount,
                    averageRating: data.items[index].volumeInfo.averageRating,
                    ratingsCount: data.items[index].volumeInfo.ratingsCount,
                    image: img
                }
                newBooks.push(newBook)
                // console.log(books.length);
                // console.log(books[index]);
                // console.log(index);

            }
            // console.log(books);

            setBooks(newBooks);
            return;

        } catch (error) {
            throw error;
        }
    }

    const getBook = async (bookParameter: BookParameter) => {

        let url: string = `https://www.googleapis.com/books/v1/volumes/${bookParameter.q}?key=AIzaSyAYUM0ItO089WvCjYZ0M8Lb2EHoJoXBbGY`
        console.log(url);

        try {
            const response = await fetch(url)


            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as any;
            setBooks([]);
            console.log("data:");

            console.log(data);

            // console.log(data.items.length);
            let newBooks: Book[] = []

            let img: string | null;
            if (typeof data.volumeInfo.imageLinks == "undefined") {
                img = null
            } else {
                img = data.volumeInfo.imageLinks.thumbnail;
            }

            let newBook: Book = {
                id: data.id,
                title: data.volumeInfo.title,
                authors: data.volumeInfo.authors,
                publishedDate: data.volumeInfo.publishedDate,
                description: data.volumeInfo.description,
                categories: data.volumeInfo.categories,
                pageCount: data.volumeInfo.pageCount,
                averageRating: data.volumeInfo.averageRating,
                ratingsCount: data.volumeInfo.ratingsCount,
            }
            newBooks.push(newBook)

            setBooks(newBooks);
            return;

        } catch (error) {
            throw error;
        }
    }



    return (
        <BookContext.Provider value={{ getBooks: getBooks, getBook, books }}>
            {
                children
            }
        </BookContext.Provider>
    )
}



// låter andra filer använda BookContext
export const useBook = (): BookContextType => {
    const context = useContext(BookContext);

    if (!context) {
        throw new Error("useBook måste ha BookProvider");
    }

    return context;
}