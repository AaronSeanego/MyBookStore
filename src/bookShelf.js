import App from "./App";
import { Link } from "react-router-dom";
import searchBook from "./searchBooks";
import './bookShelf.css';
import PropTypes from 'prop-types';

const displayShelf = ({booksShelf,onChangeValue}) => {
  const getBook = (book) => {
    console.log(book);
  }

  const getDropdown = (e) => {
    console.log(e.target.value);
    console.log(e.target.parentElement.parentElement.parentElement.querySelector(".book_id_class").innerText);
    onChangeValue(e.target.parentElement.parentElement.parentElement.querySelector(".book_id_class").innerText,e.target.value);
    // alert("You have selected a new book. Press ok to continue");
  }

  // console.log(booksShelf);
    return (
        <div className="list-books">
<div className="list-books-title">
  <h1>MyReads</h1>
</div>
<div className="list-books-content">
  <div>
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            booksShelf.map((bookList) => bookList.shelf == "currentlyReading" && <li key={bookList.id}>
            <div className="book">
            <div className="book_id_class">{bookList.id}</div>
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                      `url("${bookList.imageLinks['thumbnail']}")`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select defaultValue={bookList.shelf} key={bookList.id} onChange={getDropdown}>
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value={bookList.shelf}>
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{bookList.title}</div>
              <div className="book-authors">{bookList.authors[0]}</div>
            </div>
          </li>)
          }
        </ol>
      </div>
    </div>
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want to Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {
            booksShelf.map((bookList) => bookList.shelf == "wantToRead" && <li key={bookList.id}>
            <div className="book">
            <div className="book_id_class">{bookList.id}</div>
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                      `url("${bookList.imageLinks['thumbnail']}")`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select defaultValue={bookList.shelf} key={bookList.id} onChange={getDropdown}>
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">
                      Currently Reading
                    </option>
                    <option value={bookList.shelf}>Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{bookList.title}</div>
              <div className="book-authors">{bookList.authors[0]}</div>
            </div>
          </li>)
          }
        </ol>
      </div>
    </div>
    <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {
            booksShelf.map((bookList) => bookList.shelf == "read" && <li key={bookList.id}>
            <div className="book">
            <div className="book_id_class">{bookList.id}</div>
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                      `url("${bookList.imageLinks['thumbnail']}")`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select defaultValue={bookList.shelf} key={bookList.id} onChange={getDropdown}>
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value={bookList.shelf}>Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{bookList.title}</div>
              <div className="book-authors">{bookList.authors[0]}</div>
            </div>
          </li>)
          }
        </ol>
      </div>
    </div>
  </div>
</div>
<div className="open-search">
  {/* <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a> */}
  <Link to="/searchBook">Add a book</Link>
</div>
</div>
    )
}

displayShelf.propTypes = {
  booksShelf: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired
}
export default displayShelf;