import React, { useEffect, useState } from "react"
import { useBook } from "../context/BookContext";
import SingleBook from "../components/SingleBook";
import { useNavigate } from "react-router-dom";
import './css/BooksPage.css'
import { BookParameter } from "../types/book.types";
import searchImg from '../assets/magnifying-glass.png'

const BlogpostsPage = () => {
  const { getBooks, books } = useBook();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');

  console.log(books);

  // hämtar böcker när komponenten laddas in
  useEffect(() => {
    console.log("term: " + searchTerm);

    if (searchTerm == '') {
      console.log("funkar");

      let sr = localStorage.getItem('search')
      console.log(sr);

      if (sr) {
        setSearch(sr)
        setSearchTerm(sr)
      }
    }
    const para: BookParameter = {
      q: search,
    };
    getBooks(para);
    localStorage.setItem('search', search)
  }, [search]) //körs vid inladdning och när search uppdateras

  // uppdaterar search
  const searchFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) {
      setSearch(searchTerm)
      console.log(search);
    }

  }

  return (
    <>
      <h1 className="posts-heading">Böcker</h1>
      {/* sök på böcker */}
      <form className="search-form" onSubmit={searchFormSubmit}>
        <label htmlFor="search" className="visually-hidden">Sök:</label>
        <div>
          <input type="text" id="search" className="" placeholder="Sök" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); }} />
          <button type="submit"><img src={searchImg} alt="Sök" /></button>
        </div>
      </form>

      <div className="blogposts-display">
        {
          // Kollar så books inte är tom
          books.length > 0 ?
            books.map((book) => (
              // gjorde article här så key funkar
              <article key={book.id} className="books-articles" onClick={() => {
                navigate(`/book/:${book.id}`);
              }}>
                <SingleBook id={book.id} title={book.title} authors={book.authors} publishedDate={book.publishedDate}
                  description={book.description} categories={book.categories} pageCount={book.pageCount} averageRating={book.averageRating} ratingsCount={book.ratingsCount} image={book.image} />
              </article>
            )) : <p>Inga böcker hittades</p>
        }
      </div>
    </>

  )
}

export default BlogpostsPage