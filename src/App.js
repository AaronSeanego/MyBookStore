import "./App.css";
import { useState,useEffect } from "react";
import * as bookAPI from "./BooksAPI";
import BookShelf from "./bookShelf";
import CurrentlyReading from "./currentlyReading";
import WantToRead from "./wantToRead";
import Reading from "./reading";
import { Route, Router,Routes } from "react-router-dom";
import Search from "./searchBooks";
import {browserHistory} from 'react-router-dom';

function App() {
  const [booksShelf, setBookShelfStatus] = useState([]);

  const searchBook = (searchTerm) => {
    const search = async () => {
      const res = await bookAPI.search(searchTerm);
      console.log(res);
      setBookShelfStatus(res);
    };
    search();
  }

  const getAllBooks = () => {
    const allBooks = async () => {
      const res = await bookAPI.getAll();
      console.log(res);
      setBookShelfStatus(res);
    };
    allBooks();
  }

  const getBookByID = (bookID,shelf) => {
    const getBookObj = async () => {
      const res = await bookAPI.get(bookID);
      console.log(res);
      updateShelf(res,shelf);
    };
    getBookObj();
    // getAllBooks();
  };

  const updateShelf = (book,shelfStatus) => {
    const update = async () => {
      const res = await bookAPI.update(book,shelfStatus);
      if(res) {
        getAllBooks();
      }
    };
    update();
  }

  useEffect(() => {
    const getBooks = async () => {
      const res = await bookAPI.getAll();
      console.log(res);
      setBookShelfStatus(res);
    };

    getBooks();
  }, [])
  return (
    <Routes>
      {
        booksShelf.length > 0 && <Route key="home_page" path = "/" element={[<CurrentlyReading booksShelf={booksShelf} onChangeValue={
          (ID,shelf) => {
            getBookByID(ID,shelf);
          }
        }/>,<WantToRead booksShelf={booksShelf} onChangeValue={
          (ID,shelf) => {
            getBookByID(ID,shelf);
          }
        }/>,<Reading booksShelf={booksShelf} onChangeValue={
          (ID,shelf) => {
            getBookByID(ID,shelf);
          }
        }/>]}>
        </Route>
      }
      <Route key="search-page" path = "/searchBook" element={<Search booksShelf={booksShelf} onSearch={
        (book) => {
          searchBook(book);
        }
      } onRedirect={
        (books) => {
          getAllBooks();
        }
      } onChangeValue={
        (ID,shelf) => {
          getBookByID(ID,shelf);
        }
      }/>}></Route>
    </Routes>
  );
}

export default App;
