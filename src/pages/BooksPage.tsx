import React, { useEffect, useState } from "react"
import { useBook } from "../context/BookContext";
import SingleBook from "../components/SingleBook";
import { useNavigate } from "react-router-dom";
import './css/BlogpostsPage.css'
import { BookParameter } from "../types/book.types";

const BlogpostsPage = () => {
  const { getBooks, books } = useBook();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  console.log(books);
  
  // hämtar posts när komponenten laddas in
  useEffect(() => {
    const para: BookParameter = {
      q: "flowers+inauthor:keyes",
    };
    getBooks(para);
  }, []) //searchTerm

  return (
    <>
      <h1 className="posts-heading">Blogginlägg</h1>
      <div className="blogposts-display">
        {
          // Kollar så posts inte är tom
          books.length > 0 ?
            books.map((book) => (
              // gjorde article här så key funkar
              <article key={book.id}>
                <SingleBook id={book.id} title={book.title} authors={book.authors} publishedDate={book.publishedDate}
                  description={book.description} categories={book.categories} pageCount={book.pageCount} averageRating={book.averageRating} ratingsCount={book.ratingsCount} image={book.image} />
                <p role="link" className="readmore" onClick={() => {
                  navigate(`/book/:${book.id}`);
                }}>Läs mer ➝</p>
              </article>
            )) : <p>Inga blogginlägg hittades</p>
        }
      </div>
    </>

  )
}

export default BlogpostsPage